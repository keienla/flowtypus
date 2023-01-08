import { ITransitionInEventConstructor, ITransitionOutEventConstructor } from './core'

type TransitionKey = string | '*'
type TransitionDirection = '=>' | '<=' | '<=>'
export type TransitionType = `${TransitionKey} ${TransitionDirection} ${TransitionKey}`

export type TransitionFnIn = (params: ITransitionInEventConstructor) => Promise<any>
export type TransitionFnOut = (params: ITransitionOutEventConstructor) => Promise<any>

export interface ITransition {
    in: TransitionFnIn
    out: TransitionFnOut
}
