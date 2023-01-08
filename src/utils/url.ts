/**
 * Transform a given string to URL Element if possible
 * If there is no origin, will take the parameter origin and if not set will use as reference the current page url
 * @param  {string|URL|null} url
 * @param  {string} origin?
 * @returns URL|null
 */
export function transformToURL(url: string | URL | null, origin?: string): URL | null {
    if (!url) return null

    if (url instanceof URL) return url

    try {
        return new URL(url)
    } catch (err) {
        try {
            return new URL(url, origin || window.location.href)
        } catch (e) {
            return null
        }
    }
}

/**
 * Get the URL of the current window locaction
 * @returns URL|null
 */
export function getCurrentURL(): URL | null {
    return transformToURL(window.location.href)
}

/**
 * Check if the given element exist and is instance of URL
 * @param  {URL|null} url
 * @returns boolean
 */
export function isURL(url: URL | null | any): url is URL {
    return url instanceof URL
}

/**
 * Check if two given url have the same origin
 * @param  {URL|string|null} url1
 * @param  {URL|string|null} url2
 * @returns boolean
 */
export function isSameOrigin(url1: URL | string | null, url2: URL | string | null): boolean {
    url1 = transformToURL(url1)
    url2 = transformToURL(url2)

    return isURL(url1) && isURL(url2) && url1.origin === url2.origin
}

/**
 * Check if the two urls exist and if the paths are same
 * @param  {URL|string|null} url1
 * @param  {URL|string|null} url2
 * @returns boolean
 */
export function isSamePath(url1: URL | string | null, url2: URL | string | null): boolean {
    url1 = transformToURL(url1)
    url2 = transformToURL(url2)

    return (
        isURL(url1) && isURL(url2) && url1.pathname === url2.pathname && url1.search === url2.search
    )
}

/**
 * Find the direct A or A parent if exist of a given HTMLElement
 * @param  {HTMLElement|null} el
 * @returns HTMLAnchorElement
 */
export function findTargetAnchor(el?: HTMLElement | null): HTMLAnchorElement | null {
    if (!el) return null
    if (el.tagName === 'A') return el as HTMLAnchorElement
    if (el.parentElement) return findTargetAnchor(el.parentElement)
    return null
}
