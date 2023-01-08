export interface ILoadingProgress {
    progress: number
    fullBytesLength: number
    bytesReceived: number
    cache: boolean
    done: boolean
}

export class LoadingProgressEvent extends Event {
    detail: ILoadingProgress

    constructor(detail: ILoadingProgress) {
        super('flow:loading:progress')

        this.detail = detail
    }
}

export type State = 'error' | 'in' | 'out' | 'end'

export interface IProperties {
    view: HTMLElement | null
    template: string | null
    url: URL | string | null
}

export interface ITransitionOutEventConstructor extends EventInit {
    from: IProperties
    to: Pick<IProperties, 'template' | 'url'>
    link: HTMLAnchorElement | null
    transitionKey: string | null
    container: HTMLElement | null
}

export class TransitionOutEvent extends Event {
    from: ITransitionOutEventConstructor['from']
    to: ITransitionOutEventConstructor['to']
    link: ITransitionOutEventConstructor['link']
    transitionKey: ITransitionOutEventConstructor['transitionKey']
    container: ITransitionOutEventConstructor['container']

    constructor(init: ITransitionOutEventConstructor) {
        super('flow:transition:out')

        this.from = init.from
        this.to = init.to
        this.link = init.link
        this.transitionKey = init.transitionKey
        this.container = init.container
    }
}

export interface ITransitionInEventConstructor extends EventInit {
    from: IProperties
    to: IProperties & { document: Document; container: HTMLElement | null }
    link: HTMLAnchorElement | null
    transitionKey: string | null
    container: HTMLElement | null
}

export class TransitionInEvent extends Event {
    from: ITransitionInEventConstructor['from']
    to: ITransitionInEventConstructor['to']
    link: ITransitionInEventConstructor['link']
    transitionKey: ITransitionInEventConstructor['transitionKey']
    container: ITransitionInEventConstructor['container']

    constructor(init: ITransitionInEventConstructor) {
        super('flow:transition:in')

        this.from = init.from
        this.to = init.to
        this.link = init.link
        this.transitionKey = init.transitionKey
        this.container = init.container
    }
}

export interface ITransitionEndEventConstructor extends EventInit {
    from: IProperties
    to: (IProperties & { document?: Document; container?: HTMLElement | null }) | null
    link: HTMLAnchorElement | null
    transitionKey: string | null
    container: HTMLElement | null
    error: null | any
}

export class TransitionEndEvent extends Event {
    from: ITransitionEndEventConstructor['from']
    to:
        | (ITransitionEndEventConstructor['to'] & {
              document?: Document
              container?: HTMLElement | null
          })
        | null
    link: ITransitionEndEventConstructor['link']
    transitionKey: ITransitionEndEventConstructor['transitionKey']
    container: ITransitionEndEventConstructor['container']
    error: ITransitionEndEventConstructor['error']

    constructor(init: ITransitionEndEventConstructor) {
        super('flow:transition:end')

        this.from = init.from
        this.to = init.to
        this.link = init.link
        this.transitionKey = init.transitionKey
        this.container = init.container
        this.error = init.error
    }
}
