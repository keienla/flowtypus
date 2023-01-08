import { State } from 'interfaces/core'
import { ITransition, TransitionType } from 'interfaces/transitions'

/**
 * Utility to parse string and create Document
 */
export const DOM_PARSER: DOMParser = new window.DOMParser()

/**
 * The container of view.
 * If a value is set, it's the name of the current template
 */
export const CONTAINER_ATTR: 'data-flowtypus-container' = 'data-flowtypus-container'

/**
 * Attribute set to the view to detect new content
 * The div with this attribute must be directly under the div with CONTAINER_ATTR attribute
 *
 * A value can be set and it will be the name of the template for start transitions with going from this template to ???
 */
export const VIEW_ATTR: 'data-flowtypus-view' = 'data-flowtypus-view'

/**
 * The template to do the transition for.
 * Like this can directly choose the good transition and don't have to wait the response of the fetch to start
 */
export const TARGET_TEMPLATE_ATTR: 'data-flowtypus-target-template' =
    'data-flowtypus-target-template'

/**
 * The attribute set to old view while transition
 * Like this can detect it with selector easily && know wich block to delete
 */
export const OLD_VIEW_ATTR: 'data-flowtypus-old-view' = 'data-flowtypus-old-view'

/**
 * The attribute set to new view while transition
 * Like this can detect it with selector easily
 */
export const NEW_VIEW_ATTR: 'data-flowtypus-new-view' = 'data-flowtypus-new-view'

/**
 * The attribute to set to link wich we don't want to make transition
 * So the page transition will not occur and will click on link will load the page normaly
 */
export const DISABLED_LINK_ATTR: 'data-flowtypus-disabled' = 'data-flowtypus-disabled'

/**
 * When a script has this attribute
 * Will be reloaded when updating page
 */
export const SCRIPTS_RELOAD_ATTR: 'data-flowtypus-reload' = 'data-flowtypus-reload'

/**
 * List of the links of the page that have event for fetching other page and do transitions
 */
export const LINKS: HTMLAnchorElement[] = []

/**
 * Object that contain :
 *  [key]: the url
 *  [value]: the response of the fetch as string
 *
 * If trying to change page and the url is stocked in as key in CACHE
 * so the fetch will not be called and the response will be the [value] of the [key]
 */
export const CACHE: Map<string, string> = new Map()

/**
 * It contain the list of url that already be pre-fetched.
 * Like this don't need to pre-fetch multiple time the same url
 */
export const PRE_FETCHED: string[] = []

/**
 * The list of fetching urls with response
 */
export const FETCHING: Map<string, Promise<Response>> = new Map()

/**
 * The params of Flowtypus
 * - previousTemplate: the name of the previous template
 * - transitions: the list of all transitions
 * - state: the current state of animation
 * - previousURL: the URL of current position
 */
export const FLOW_CORE: {
    previousTemplate: string | null
    transitions: Map<TransitionType | `${TransitionType} (reduced)`, ITransition>
    state: State
    previousURL: URL | null
} = {
    previousTemplate: null,
    transitions: new Map(),
    state: 'end',
    previousURL: null,
}

/**
 * The default in/out transition
 */
export const DEFAULT_TRANSITION: ITransition = {
    out: async (params) => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
        const animation = params.from.view?.animate([{ opacity: 1 }, { opacity: 0 }], {
            duration: 200,
            iterations: 1,
            fill: 'forwards',
            easing: 'ease-out',
        })

        animation?.play()
        return animation?.finished || Promise.resolve()
    },
    in: async (params) => {
        if (params.from.view) params.from.view.style.position = 'absolute'

        const animation = params.to.view?.animate([{ opacity: 0 }, { opacity: 1 }], {
            duration: 200,
            iterations: 1,
            fill: 'forwards',
            easing: 'ease-in',
        })

        animation?.play()
        return animation?.finished || Promise.resolve()
    },
}

/**
 * The default in/out transition reduced
 */
export const DEFAULT_TRANSITION_REDUCED: ITransition = {
    out: async () => {
        return Promise.resolve()
    },
    in: async () => {
        return Promise.resolve()
    },
}
