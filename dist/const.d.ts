import { State } from 'interfaces/core';
import { ITransition, TransitionType } from 'interfaces/transitions';
export declare const DOM_PARSER: DOMParser;
export declare const CONTAINER_ATTR: 'data-flowtypus-container';
export declare const VIEW_ATTR: 'data-flowtypus-view';
export declare const TARGET_TEMPLATE_ATTR: 'data-flowtypus-target-template';
export declare const OLD_VIEW_ATTR: 'data-flowtypus-old-view';
export declare const NEW_VIEW_ATTR: 'data-flowtypus-new-view';
export declare const DISABLED_LINK_ATTR: 'data-flowtypus-disabled';
export declare const SCRIPTS_RELOAD_ATTR: 'data-flowtypus-reload';
export declare const LINKS: HTMLAnchorElement[];
export declare const CACHE: Map<string, string>;
export declare const PRE_FETCHED: string[];
export declare const FETCHING: Map<string, Promise<Response>>;
export declare const FLOW_CORE: {
    previousTemplate: string | null;
    transitions: Map<TransitionType | `${TransitionType} (reduced)`, ITransition>;
    state: State;
    previousURL: URL | null;
};
export declare const DEFAULT_TRANSITION: ITransition;
export declare const DEFAULT_TRANSITION_REDUCED: ITransition;
//# sourceMappingURL=const.d.ts.map