export declare function getParsedHTML(html: string | Document): Document;
export declare function getContainer(document: Document): HTMLElement | null;
export declare function getView(document: Document): HTMLElement | null;
export declare function getTemplateName(document: Document): string | null;
export declare function getTargetTemplateName(el: HTMLElement | null): string | null;
export declare function updateAttr(newELement: Element, currentElement: Element, attr: string, defaultValue?: string): void;
export declare const updateLang: import("@keienla/functional/dist/models/curry.model").Curry<(newDocument: Document, currentDocument: Document) => Document, 0>;
export declare const mergeHead: import("@keienla/functional/dist/models/curry.model").Curry<(newDocument: Document, currentDocument: Document) => Document, 0>;
export declare const setNewContent: import("@keienla/functional/dist/models/curry.model").Curry<(newDocument: Document, currentDocument: Document) => Document, 0>;
export declare function deleteOldContent(doc: Document): Document;
export declare function getNavigationLinks(dom?: Document): HTMLAnchorElement[];
export declare function getScriptsToReload(dom?: Document): HTMLScriptElement[];
export declare function replaceAndRunScript(oldScript: HTMLScriptElement): void;
export declare function prefetchUrl(url: string | URL | null, dom?: Document): void;
export declare const updateDOMForInTransitionPage: import("@keienla/functional/dist/models/curry.model").Curry<(newDocument: Document, currentDocument: Document) => Document | never, 0>;
//# sourceMappingURL=dom.d.ts.map