export interface ILoadingProgress {
    progress: number;
    fullBytesLength: number;
    bytesReceived: number;
    cache: boolean;
    done: boolean;
}
export declare class LoadingProgressEvent extends Event {
    detail: ILoadingProgress;
    constructor(detail: ILoadingProgress);
}
export declare type State = 'error' | 'in' | 'out' | 'end';
export interface IProperties {
    view: HTMLElement | null;
    template: string | null;
    url: URL | string | null;
}
export interface ITransitionOutEventConstructor extends EventInit {
    from: IProperties;
    to: Pick<IProperties, 'template' | 'url'>;
    link: HTMLAnchorElement | null;
    transitionKey: string | null;
    container: HTMLElement | null;
}
export declare class TransitionOutEvent extends Event {
    from: ITransitionOutEventConstructor['from'];
    to: ITransitionOutEventConstructor['to'];
    link: ITransitionOutEventConstructor['link'];
    transitionKey: ITransitionOutEventConstructor['transitionKey'];
    container: ITransitionOutEventConstructor['container'];
    constructor(init: ITransitionOutEventConstructor);
}
export interface ITransitionInEventConstructor extends EventInit {
    from: IProperties;
    to: IProperties & {
        document: Document;
        container: HTMLElement | null;
    };
    link: HTMLAnchorElement | null;
    transitionKey: string | null;
    container: HTMLElement | null;
}
export declare class TransitionInEvent extends Event {
    from: ITransitionInEventConstructor['from'];
    to: ITransitionInEventConstructor['to'];
    link: ITransitionInEventConstructor['link'];
    transitionKey: ITransitionInEventConstructor['transitionKey'];
    container: ITransitionInEventConstructor['container'];
    constructor(init: ITransitionInEventConstructor);
}
export interface ITransitionEndEventConstructor extends EventInit {
    from: IProperties;
    to: (IProperties & {
        document?: Document;
        container?: HTMLElement | null;
    }) | null;
    link: HTMLAnchorElement | null;
    transitionKey: string | null;
    container: HTMLElement | null;
    error: null | any;
}
export declare class TransitionEndEvent extends Event {
    from: ITransitionEndEventConstructor['from'];
    to: (ITransitionEndEventConstructor['to'] & {
        document?: Document;
        container?: HTMLElement | null;
    }) | null;
    link: ITransitionEndEventConstructor['link'];
    transitionKey: ITransitionEndEventConstructor['transitionKey'];
    container: ITransitionEndEventConstructor['container'];
    error: ITransitionEndEventConstructor['error'];
    constructor(init: ITransitionEndEventConstructor);
}
//# sourceMappingURL=core.d.ts.map