import { replaceAndRunScript } from './utils/dom';
import { ITransition, TransitionFnIn, TransitionFnOut, TransitionType } from './interfaces/transitions';
export declare function clearAllCache(): void;
export declare function clearCacheForUrl(url: string | URL | null): boolean;
export declare function setTransition(key: TransitionType, transitionOut: TransitionFnOut, transitionIn: TransitionFnIn, reducedMotion?: boolean): void;
export declare function goToPage(url: URL | string | null, template?: string | null, event?: MouseEvent): boolean;
export declare function rerunScripts(): void;
export declare function flowtypus(): {
    back: () => boolean;
    forward: () => boolean;
    setTransition: typeof setTransition;
    goToPage: (url: string | URL | null, template?: string | null) => void;
    rerunScript: typeof replaceAndRunScript;
    rerunScripts: typeof rerunScripts;
    clearAllCache: typeof clearAllCache;
    clearCacheForUrl: typeof clearCacheForUrl;
};
export declare function findTransition(previousTemplate: string, targetTemplate: string): {
    transitionKey: TransitionType;
    transition: ITransition;
};
//# sourceMappingURL=core.d.ts.map