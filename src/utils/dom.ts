import {
    CONTAINER_ATTR,
    DISABLED_LINK_ATTR,
    DOM_PARSER,
    NEW_VIEW_ATTR,
    OLD_VIEW_ATTR,
    PRE_FETCHED,
    SCRIPTS_RELOAD_ATTR,
    TARGET_TEMPLATE_ATTR,
    VIEW_ATTR,
} from '../const'
import { compare } from './generic'
import { isSameOrigin, transformToURL } from './url'
import { curry, pipe } from '@keienla/functional'

/**
 * Parse the html string and return a document
 * @param  {string} html
 * @returns Document
 */
export function getParsedHTML(html: string | Document): Document {
    if (html instanceof Document) return html
    return DOM_PARSER.parseFromString(
        typeof html === 'string' ? html : (html as any).toString(),
        'text/html'
    )
}

/**
 * Get the container
 * i.e the element with param data-flowtypus-container
 * if no exist return body
 * @param  {Document} document
 * @returns HTMLElement|null
 */
export function getContainer(document: Document): HTMLElement | null {
    if (!document || !(document instanceof Document)) return null
    return document.querySelector(`[${CONTAINER_ATTR}]`) || null
}

/**
 * Get the view that is not the oldView
 * i.e the element with param data-flowtypus-view
 * if no exist return body
 * @param  {Document} document
 * @returns HTMLElement|null
 */
export function getView(document: Document): HTMLElement | null {
    return (
        (Array.from(getContainer(document)?.children || []).filter(
            (el) => el.hasAttribute(VIEW_ATTR) && !el.hasAttribute(OLD_VIEW_ATTR)
        )[0] as HTMLElement) || null
    )
}

/**
 * Extract the template name of the given document if there is one
 * To add one add a value to the data-flowtypus-container of the page
 * @param  {Document} html
 * @returns string|null
 */
export function getTemplateName(document: Document): string | null {
    const view = getView(document)
    return view?.getAttribute?.(VIEW_ATTR) || null
}

/**
 * Check if the given HTMLElement have the 'data-flowtypus-target-template' attribute
 * If true return it's value
 * @param  {HTMLAnchorElement|null} el
 * @returns string|null
 */
export function getTargetTemplateName(el: HTMLElement | null): string | null {
    if (!el || !(el instanceof HTMLElement)) return null

    if (el.hasAttribute(TARGET_TEMPLATE_ATTR)) return el.getAttribute(TARGET_TEMPLATE_ATTR) || null
    return null
}

/**
 * Replace the value of attribute given in the currentElement with the value in the newElement given
 * @param  {Element} newELement The element with the new attr value
 * @param  {Element} currentElement The element with the old attr value
 * @param  {string} attr The key attribute to replace
 * @param  {string} defaultValue The default value if newElement doesn't have attr value
 * @returns void
 */
export function updateAttr(
    newELement: Element,
    currentElement: Element,
    attr: string,
    defaultValue: string = ''
): void {
    if (
        !!currentElement &&
        currentElement.getAttribute(attr) !== newELement?.getAttribute?.(attr)
    ) {
        currentElement.setAttribute(attr, newELement?.getAttribute?.(attr) || defaultValue)
    }
}

/**
 * Replace the actual lang/dir of the page with the lang/dir of the new page
 * @param  {Document} newDocument The document to get the informations/content
 * @param  {Document} currentDocument The default document to update
 * @returns Document The currentDocument modified
 */
export const updateLang = curry(function updateLang(
    newDocument: Document,
    currentDocument: Document
): Document {
    const currentElement: Element = currentDocument.children[0]
    const newElement: Element = newDocument.children[0]

    updateAttr(newElement, currentElement, 'lang')
    updateAttr(newElement, currentElement, 'dir', 'ltr')

    return currentDocument
})

/**
 * - Remove all element in head of previous page that are not in current head
 * - Add all elements in head in the new page
 * - Update the language if nedded
 * @param  {Document} newDocument The document to get the informations/content
 * @param  {Document} currentDocument The default document to update
 * @returns Document The currentDocument modified
 */
export const mergeHead = curry(function mergeHead(
    newDocument: Document,
    currentDocument: Document
): Document {
    // Get the element in head in currentDocument
    const currentHead = Array.from(currentDocument.head.children)
    // Get the element in head in newDocument
    const nextHead = Array.from(newDocument.head.children)

    // Extract all element to remove add
    const { missing, added } = compare(currentHead, nextHead, (a: Element, b: Element) =>
        a.isEqualNode(b)
    )

    // Remove all elements in head that are not in the new document head
    missing.forEach((node) => node.remove())
    // Add all the elements that are new in the new document
    currentDocument.head.append(...added)
    // Run the scripts
    added
        .filter((el) => el.tagName === 'SCRIPT')
        .forEach((el: HTMLScriptElement) => replaceAndRunScript(el))

    return currentDocument
})

/**
 * Add the view of newDocument just after the view of currentDocument
 * @param  {Document} newDocument The document to get the informations/content
 * @param  {Document} currentDocument The default document to update
 * @returns Document The currentDocument modified
 */
export const setNewContent = curry(function setNewContent(
    newDocument: Document,
    currentDocument: Document
): Document {
    let fullContainer = getContainer(currentDocument)

    if (!fullContainer) {
        throw new Error('no container with attribute "' + CONTAINER_ATTR + '"')
    }

    let currentContent = getView(currentDocument)
    let newContent = getView(newDocument)

    if (!currentContent) throw new Error('No view with attribute')
    if (!currentContent || !newContent) throw new Error('No content')

    // Set attributes to views to distinct easily
    newContent.setAttribute(NEW_VIEW_ATTR, 'true')
    currentContent.setAttribute(OLD_VIEW_ATTR, 'true')

    // Set the new content after current content
    if (currentContent.nextSibling) {
        fullContainer.insertBefore(newContent, currentContent.nextSibling)
    } else {
        fullContainer.append(newContent)
    }

    return currentDocument
})

/**
 * Remove the view with OLD_VIEW_ATTR
 * @param  {Document} doc
 * @returns Document
 */
export function deleteOldContent(doc: Document): Document {
    // Remove old content
    const todoRemove = doc.querySelector(`[${OLD_VIEW_ATTR}]`)
    todoRemove?.remove()

    // Remove attribute in new content
    const newView = doc.querySelector(`[${NEW_VIEW_ATTR}]`)
    newView?.removeAttribute(NEW_VIEW_ATTR)

    return doc
}

/**
 * Get all links that can make a transition for transition page with same origin
 * i.e links with no target or target !== _self
 * & links without DISABLED_LINK_ATTR
 * & links with href can only navigation in page with ids
 * @param  {Document?} dom
 * @returns HTMLAnchorElement
 */
export function getNavigationLinks(dom: Document = document): HTMLAnchorElement[] {
    return Array.from<HTMLAnchorElement>(
        dom.querySelectorAll(`a:not([${DISABLED_LINK_ATTR}]):not([href^="#"])`)
    ).filter((link) => {
        if (!isSameOrigin(link.getAttribute('href'), window.location.href)) return false
        if (!link.hasAttribute('target')) return true
        return link.getAttribute('target') === '_self'
    })
}

/**
 * Get all links in head and body that will be reloaded when updating page
 * Those links can be selected because have attr SCRIPTS_RELOAD_ATTR
 * @param  {Document?} dom
 * @returns HTMLScriptElement
 */
export function getScriptsToReload(dom: Document = document): HTMLScriptElement[] {
    // Get scripts to reload in Head
    const headScripts: NodeListOf<HTMLScriptElement> = dom.head.querySelectorAll(
        `script[${SCRIPTS_RELOAD_ATTR}]`
    )
    // Get scripts to reload in body
    const bodyScripts: NodeListOf<HTMLScriptElement> = dom.body.querySelectorAll(
        `script[${SCRIPTS_RELOAD_ATTR}]`
    )

    return [...Array.from(headScripts), ...Array.from(bodyScripts)]
}

/**
 * ! Can't test with JEST, have to do it in Cypress
 * Replace the script by the exact same script (but like this other reference) and rerun it
 *
 * @param  {HTMLScriptElement} oldScript The script to replace
 */
export function replaceAndRunScript(oldScript: HTMLScriptElement): void {
    const newScript = document.createElement('script')
    const attrs = Array.from(oldScript.attributes)
    for (const { name, value } of attrs) {
        newScript[name] = value
    }
    newScript.append(oldScript.textContent || '')
    oldScript.replaceWith(newScript)
}

/**
 * Create a link element to prefetch the given url
 * When the url is given, save it to not redo the prefetching and recreate the same link element
 * @param  {string} url
 * @param  {Document?} dom
 */
export function prefetchUrl(url: string | URL | null, dom: Document = document): void {
    url = transformToURL(url)

    if (!url?.href || PRE_FETCHED.indexOf(url.href) !== -1) return void 0

    const linkEl: HTMLLinkElement = dom.createElement('link')
    linkEl.setAttribute('rel', 'prefetch')
    linkEl.setAttribute('href', url.href)
    linkEl.setAttribute('as', 'document')

    dom.head.appendChild(linkEl)

    PRE_FETCHED.push(url.href)
}

/**
 * @param  {Document} newDocument The document to get the informations/content
 * @param  {Document} currentDocument The default document to update
 * @returns Document The currentDocument modified
 */
export const updateDOMForInTransitionPage = curry(function updateDOMForInTransitionPage(
    newDocument: Document,
    currentDocument: Document
): Document | never {
    return pipe(
        setNewContent(newDocument),
        updateLang(newDocument),
        mergeHead(newDocument)
    )(currentDocument)
})
