import { ITransitionInEventConstructor, ITransitionOutEventConstructor } from './core';
declare type TransitionKey = string | '*';
declare type TransitionDirection = '=>' | '<=' | '<=>';
export declare type TransitionType = `${TransitionKey} ${TransitionDirection} ${TransitionKey}`;
export declare type TransitionFnIn = (params: ITransitionInEventConstructor) => Promise<any>;
export declare type TransitionFnOut = (params: ITransitionOutEventConstructor) => Promise<any>;
export interface ITransition {
    in: TransitionFnIn;
    out: TransitionFnOut;
}
export {};
//# sourceMappingURL=transitions.d.ts.map