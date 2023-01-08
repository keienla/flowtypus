export declare function transformToURL(url: string | URL | null, origin?: string): URL | null;
export declare function getCurrentURL(): URL | null;
export declare function isURL(url: URL | null | any): url is URL;
export declare function isSameOrigin(url1: URL | string | null, url2: URL | string | null): boolean;
export declare function isSamePath(url1: URL | string | null, url2: URL | string | null): boolean;
export declare function findTargetAnchor(el?: HTMLElement | null): HTMLAnchorElement | null;
//# sourceMappingURL=url.d.ts.map