import { TransitionType } from 'interfaces';
declare type compareResponseKey = 'missing' | 'added' | 'commun';
export declare function compare<T extends any[] = [], K = T extends (infer U)[] ? U : any>(old: T, next: T, filter?: (valueA: K, valueB: K) => boolean): Record<compareResponseKey, K[]>;
export declare function constructPossibleTransitions(currentTemplate?: string | null, targetTemplate?: string | null, replaceStart?: boolean): TransitionType[];
export {};
//# sourceMappingURL=generic.d.ts.map