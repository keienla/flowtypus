import { divide, map, pipe } from '@keienla/functional'
import {
    CACHE,
    FETCHING,
    FLOW_CORE,
    LINKS,
    DEFAULT_TRANSITION,
    DEFAULT_TRANSITION_REDUCED,
} from './const'
import {
    deleteOldContent,
    getContainer,
    getView,
    getParsedHTML,
    getTargetTemplateName,
    getTemplateName,
    updateDOMForInTransitionPage,
    getNavigationLinks,
    getScriptsToReload,
    replaceAndRunScript,
    prefetchUrl,
} from './utils/dom'
import {
    LoadingProgressEvent,
    ITransitionEndEventConstructor,
    ITransitionInEventConstructor,
    ITransitionOutEventConstructor,
    TransitionEndEvent,
    TransitionInEvent,
    TransitionOutEvent,
} from './interfaces/core'
import {
    ITransition,
    TransitionFnIn,
    TransitionFnOut,
    TransitionType,
} from './interfaces/transitions'
import { constructPossibleTransitions } from './utils/generic'
import {
    findTargetAnchor,
    getCurrentURL,
    isSameOrigin,
    isSamePath,
    transformToURL,
} from './utils/url'

/**
 * Clear all elements in cache
 * @returns void
 */
export function clearAllCache(): void {
    CACHE.clear()
}

/**
 * Clear the cache for the given url
 * @param  {string|URL|null} url
 * @returns boolean
 */
export function clearCacheForUrl(url: string | URL | null): boolean {
    url = transformToURL(url)

    if (!url) return true

    if (!CACHE.has(url.href)) return true

    return CACHE.delete(url.href)
}

/**
 * Add a transition to the flow
 * @param  {TransitionType} key
 * @param  {TransitionFnIn} transitionIn
 * @param  {TransitionFnOut} transitionOut
 * @param  {boolean} reducedMotion If use this animation when option reduced-motion is on
 */
export function setTransition(
    key: TransitionType,
    transitionOut: TransitionFnOut,
    transitionIn: TransitionFnIn,
    reducedMotion: boolean = false
) {
    // Reformat the key to remove all unacessary spaces
    const transitionKey: TransitionType = key
        .split(' ')
        .filter((k) => !!k)
        .concat(reducedMotion ? ['(reduced)'] : [])
        .join(' ') as TransitionType
    FLOW_CORE.transitions.set(transitionKey, {
        in: transitionIn,
        out: transitionOut,
    })
}

setTransition('* <=> *', DEFAULT_TRANSITION.out, DEFAULT_TRANSITION.in)

setTransition('* <=> *', DEFAULT_TRANSITION_REDUCED.out, DEFAULT_TRANSITION_REDUCED.in, true)

/**
 * Ask to flow to change page
 * It will occur if the given url is not the same as the current url
 *
 * If an Event is passed, will prevent the default behavior of the event and stop the propagation
 * @param  {URL|null} url The destination url
 * @param  {string|null|undefined} template The destination template if knowned
 * @param  {MouseEvent} event?
 * @returns  boolean
 */
export function goToPage(
    url: URL | string | null,
    template?: string | null,
    event?: MouseEvent
): boolean {
    // If running can't change page
    if (FLOW_CORE.state !== 'end' && FLOW_CORE.state !== 'error') {
        if (event) {
            event.preventDefault()
        }
        return false
    }

    const currentURL = getCurrentURL()

    if (!currentURL) return false

    if (typeof url === 'string') url = transformToURL(url)

    if (
        !!url &&
        isSameOrigin(url, currentURL) &&
        (event ? !(event.metaKey || event.ctrlKey) : true)
    ) {
        if (event) {
            event.preventDefault()
        }

        if (!isSamePath(url, currentURL)) {
            history?.pushState?.({ template }, '', url.href)
            changePage(
                { state: { template } },
                event ? findTargetAnchor(event?.target as HTMLElement) : null
            )
        }

        return true
    } else if (!!url && !isSameOrigin(url, currentURL)) {
        window.location.href = url.href
    }

    return false
}

/**
 * Run script with attr "data-flowtypus-reload" when change page
 * Because if update page and script is keeped, it will not be reload
 */
export function rerunScripts(): void {
    pipe(getScriptsToReload, map(replaceAndRunScript))(document)
}

/**
 * Initialize the event for the flow and return some control methods
 */
export function flowtypus(): {
    back: () => boolean
    forward: () => boolean
    setTransition: typeof setTransition
    goToPage: (url: string | URL | null, template?: string | null) => void
    rerunScript: typeof replaceAndRunScript
    rerunScripts: typeof rerunScripts
    clearAllCache: typeof clearAllCache
    clearCacheForUrl: typeof clearCacheForUrl
} {
    window.onload = () => {
        selectLinksAndAddEvents()
        updateHistoryWithCurrentTemplate()
    }

    window.addEventListener('popstate', changePage)
    FLOW_CORE.previousTemplate = getTemplateName(document)
    FLOW_CORE.previousURL = getCurrentURL()

    return {
        back: () => {
            if (!history) return false
            history.back?.()
            return true
        },
        clearAllCache,
        clearCacheForUrl,
        forward: () => {
            if (!history) return false
            history.forward?.()
            return true
        },
        goToPage: (url: string | URL | null, template?: string | null) => {
            return goToPage(url, template)
        },
        rerunScript: replaceAndRunScript,
        rerunScripts,
        setTransition,
    }
}

/**
 * When click on a link make the transition if possible
 * i.e if the link is in the same origin and not the same path
 * @param  {HTMLAnchorElement} link
 * @returns (event: MouseEvent) => void
 */
function clickLink(link: HTMLAnchorElement): (event: MouseEvent) => void {
    return (event: MouseEvent): void => {
        if (!link) return void 0

        const aURL = transformToURL(link.getAttribute('href'))
        const targetTemplate: string | null = getTargetTemplateName(link)

        goToPage(aURL, targetTemplate, event)
    }
}

/**
 * Preload the page like this if click on link the destination page will load faster
 * @param  {HTMLAnchorElement} link
 * @returns () => void
 */
function prefetchLink(link: HTMLAnchorElement): () => void {
    return (): void => {
        if (!link) return void 0

        prefetchUrl(link.href)
        link.removeEventListener('mouseenter', prefetchLink(link))
        link.removeEventListener('focus', prefetchLink(link))
    }
}

/**
 * Update content for currentURL
 * If previous url/template saved use it to do transition
 * @param  {{state?:{template?:string|null}}} {state}
 * @param  {HTMLAnchorElement|null=null} link
 * @returns Promise
 */
async function changePage(
    { state }: { state?: { template?: string | null } },
    link: HTMLAnchorElement | null = null
): Promise<void> {
    const previousTemplate = FLOW_CORE.previousTemplate || '*'
    const previousURL = FLOW_CORE.previousURL || getCurrentURL()
    const targetTemplate = state?.template || '*'
    const targetURL = getCurrentURL()

    const from: TransitionInEvent['from'] = {
        view: getView(document),
        template: previousTemplate,
        url: previousURL,
    }

    FLOW_CORE.state = 'out'

    const { transition, transitionKey } = findTransition(previousTemplate, targetTemplate)

    const OUT: ITransitionOutEventConstructor = {
        from,
        to: {
            template: targetTemplate,
            url: targetURL,
        },
        link,
        transitionKey,
        container: getContainer(document),
    }

    window.dispatchEvent(new TransitionOutEvent(OUT))

    fetchPage(getCurrentURL())
        .then(async (html) => {
            await transition.out(OUT)

            const BASE_IN_END: ITransitionEndEventConstructor = {
                from,
                to: null,
                link,
                transitionKey,
                container: getContainer(document),
                error: null,
            }

            if (!html) {
                console.error('No page founded')
                FLOW_CORE.state = 'error'
                window.dispatchEvent(
                    new TransitionEndEvent({
                        ...BASE_IN_END,
                        error: 'No page founded',
                    })
                )
                return void 0
            }

            const newDocument: Document = getParsedHTML(html).cloneNode(true) as Document

            const IN: ITransitionInEventConstructor = {
                ...BASE_IN_END,
                to: {
                    document: newDocument,
                    container: getContainer(newDocument),
                    view: getView(newDocument),
                    template: targetTemplate,
                    url: getCurrentURL(),
                },
            }

            try {
                updateDOMForInTransitionPage(newDocument, document)
            } catch (err: any) {
                FLOW_CORE.state = 'error'

                window.dispatchEvent(
                    new TransitionEndEvent({
                        ...IN,
                        error: err,
                    })
                )

                return void 0
            }

            FLOW_CORE.state = 'in'
            window.dispatchEvent(new TransitionInEvent(IN))
            await transition.in(IN)

            deleteOldContent(document)

            FLOW_CORE.state = 'end'
            window.dispatchEvent(
                new TransitionEndEvent({
                    ...IN,
                    error: null,
                })
            )

            FLOW_CORE.previousTemplate = getTemplateName(document)
            FLOW_CORE.previousURL = targetURL

            selectLinksAndAddEvents()
            rerunScripts()

            return void 0
        })
        .catch((err) => {
            FLOW_CORE.state = 'error'

            window.dispatchEvent(
                new TransitionEndEvent({
                    ...OUT,
                    to: {
                        ...OUT.to,
                        view: null,
                    },
                    error: err,
                })
            )

            console.error(err)
            return void 0
        })
}

/**
 * With previous && target template
 * Find the transition && transition key
 * @param  {string} previousTemplate
 * @param  {string} targetTemplate
 * @returns {transitionKey: TransitionType, transition: ITransition}
 */
export function findTransition(
    previousTemplate: string,
    targetTemplate: string
): { transitionKey: TransitionType; transition: ITransition } {
    const possibleTransitions: TransitionType[] = constructPossibleTransitions(
        previousTemplate,
        targetTemplate
    )

    const reducedMotion: boolean = !!window?.matchMedia?.('(prefers-reduced-motion: reduce)')
        .matches

    const defaultKey: TransitionType = `* <=> *${reducedMotion ? ' (reduced)' : ''}`

    const transitionKey =
        possibleTransitions.find((transition) => {
            return FLOW_CORE.transitions.get(transition)
        }) || defaultKey

    const transition: ITransition =
        transitionKey && FLOW_CORE.transitions.has(transitionKey)
            ? (FLOW_CORE.transitions.get(transitionKey) as ITransition)
            : FLOW_CORE.transitions.has(defaultKey)
            ? (FLOW_CORE.transitions.get(defaultKey) as ITransition)
            : reducedMotion
            ? DEFAULT_TRANSITION_REDUCED
            : DEFAULT_TRANSITION

    return {
        transitionKey,
        transition,
    }
}

/**
 * if the URL is correct, load the page and cache the request in case of user want to return in the page
 * @param  {URL|null} url
 * @returns Promise<Response>
 */
async function fetchPage(url: URL | null): Promise<string> {
    return new Promise<string>(async (resolve, reject) => {
        if (!url) return reject()
        if (CACHE.has(url.href)) {
            const page = CACHE.get(url.href) as string
            const bytes = new TextEncoder().encode(page).length

            window.dispatchEvent(
                new LoadingProgressEvent({
                    progress: 1,
                    cache: true,
                    done: true,
                    fullBytesLength: bytes,
                    bytesReceived: bytes,
                })
            )
            return resolve(page)
        }
        if (FETCHING.has(url.href)) {
            try {
                await FETCHING.get(url.href)
                return resolve(CACHE.get(url.href) as string)
            } catch (err) {
                return reject(err)
            }
        }

        try {
            FETCHING.set(
                url.href,
                fetch(url.href, {
                    mode: 'same-origin',
                    method: 'GET',
                    headers: { 'X-Requested-With': 'self-navigation', 'X-flow': '1' },
                    credentials: 'same-origin',
                })
                    .then(fetchProgress)
                    // Transform the previous stream to Response to get the data
                    .then((stream) => {
                        if (stream instanceof Response) return stream

                        return new Response(stream, {
                            headers: { 'Content-Type': 'text/html' },
                        })
                    })
            )

            const response = await FETCHING.get(url.href)
            if (!response) throw new Error()

            const content = await response.text()

            FETCHING.delete(url.href)

            if (response.status >= 200 && response.status < 300) {
                CACHE.set(url.href, content)
            } else {
                return reject({ status: response.status })
            }

            return resolve(content)
        } catch (err) {
            FETCHING.delete(url.href)
            clearCacheForUrl(url)
            return reject(err)
        }
    })
}

/**
 * If there is links in the var
 * Clear the event of click/mouseenter on it
 * Then select all links in the page and add the event of click and mouseenter
 */
function selectLinksAndAddEvents() {
    LINKS.forEach((link) => {
        link.removeEventListener('click', clickLink(link))
        link.removeEventListener('mouseenter', prefetchLink(link))
        link.removeEventListener('focus', prefetchLink(link))
    })

    LINKS.length = 0

    getNavigationLinks(document).forEach((link) => {
        LINKS.push(link)
    })

    if (LINKS?.length) {
        LINKS.forEach((link) => {
            link.addEventListener('click', clickLink(link))
            link.addEventListener('mouseenter', prefetchLink(link))
            link.addEventListener('focus', prefetchLink(link))
        })
    }
}

/**
 * Search in the current page the template name
 * and replace in history the state param with template
 * to do the transition if go back/forward
 */
function updateHistoryWithCurrentTemplate() {
    const currentURL = getCurrentURL()
    const currentTemplate = getTemplateName(document)
    history?.replaceState?.({ template: currentTemplate }, '', currentURL?.href)
}

/**
 * Send an event to show the progress of a fetch request
 * @param  {Response} res
 * @returns ReadableStream
 */
function fetchProgress(res: Response): ReadableStream<ArrayBufferView> | Response {
    if (!(res.status >= 200 && res.status < 300)) {
        return res
    }

    // Get the stream of the request
    const reader = res.body?.getReader()
    // Get the number of bytes of the element
    const fullBytesLength: number = parseInt(res.headers.get('Content-Length') || '0')

    // Usefull to count how many bytes are downloaded
    let bytesReceived: number = 0

    // Take each emit chunk to emit progress in an event
    return new ReadableStream({
        start(controller: ReadableStreamController<ArrayBufferView>) {
            function push() {
                reader?.read().then(({ done, value }): void => {
                    window.dispatchEvent(
                        new LoadingProgressEvent({
                            progress: fullBytesLength
                                ? divide(bytesReceived, fullBytesLength)
                                : done
                                ? 1
                                : 0,
                            fullBytesLength: done ? bytesReceived : fullBytesLength,
                            bytesReceived,
                            cache: false,
                            done,
                        })
                    )

                    // If no more data close the controller
                    if (done) {
                        controller.close()
                        return void 0
                    }

                    // Add the current data length received to the previous bytes length received
                    bytesReceived += value?.length || 0

                    // Get the data and send it to the browser via controller
                    controller.enqueue(value)

                    // Check chunks by logging to the console
                    push()
                })
            }

            // Check chunks by logging to the console
            push()
        },
    })
}
