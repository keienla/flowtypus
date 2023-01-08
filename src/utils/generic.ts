import { TransitionType } from 'interfaces'

type compareResponseKey = 'missing' | 'added' | 'commun'

/**
 * Compare two array and return an object that contain the commun elements, the missing elements and the added elements.
 * - The commun elements are the elements that are in the two arrays
 * - The missing elements are the elements that are in the old array (first arg) but that arn't in the next array (second arg)
 * - The added elements are the elements that are in the next array (second arg) but arn't in the old array (first arg)
 * @param  {K[]} old The previous elements that may be deleted
 * @param  {K[]} next The added elements to add
 * @param  {(valueA: K, valueB: K) => boolean} filter Compare the values in the arrays
 * @returns Record<'missing'|'added'|'commun', K[]>
 *
 * @example
 * const old = [0,2,8,4,6,9,7,36,874,5,13]
 * const new = [9,7,3,66,8,1,4,0,6,712,7485]
 * const response = compare(old, new)
 * console.log(response)
 * //{
 * //     "missing": [2,36,874,5,13],
 * //     "commun": [0,8,4,6,9,7],
 * //     "added": [3,66,1,712,7485]
 * // }
 */
export function compare<T extends any[] = [], K = T extends (infer U)[] ? U : any>(
    old: T,
    next: T,
    filter: (valueA: K, valueB: K) => boolean = (valueA: K, valueB: K) => valueA === valueB
): Record<compareResponseKey, K[]> {
    if (!old) old = [] as unknown as T
    if (!next) next = [] as unknown as T

    const lessKey: compareResponseKey = old.length > next.length ? 'added' : 'missing'
    const moreKey: compareResponseKey = lessKey === 'added' ? 'missing' : 'added'
    const lessArr = lessKey === 'added' ? next : old

    const response: Record<compareResponseKey, K[]> = {
        missing: lessKey === 'added' ? [...old] : [],
        commun: [],
        added: lessKey === 'missing' ? [...next] : [],
    }

    for (let i = 0, limit = lessArr.length; i < limit; i++) {
        const node = lessArr[i]
        const findedIndex = response[moreKey].findIndex((n) => filter(n, node))

        if (findedIndex === -1) {
            response[lessKey].push(node)
        } else {
            response['commun'].push(node)
            response[moreKey].splice(findedIndex, 1)
        }
    }

    return response
}

/**
 * For each template given create all animations transitions possible
 * @param  {string} currentTemplate The template of start of the transition
 * @param  {string} targetTemplate The template of destination of the transition
 * @param  {boolean=true} replaceStart If value === true and currentTemplate or targetTemplate !== '*' will create transitions by remplacing those args by a '*'
 * @returns TransitionType[]
 */
export function constructPossibleTransitions(
    currentTemplate?: string | null,
    targetTemplate?: string | null,
    replaceStart: boolean = true
): TransitionType[] {
    if (!currentTemplate) currentTemplate = '*'
    if (!targetTemplate) targetTemplate = '*'

    const reduced: string = !!window?.matchMedia?.('(prefers-reduced-motion: reduce)').matches
        ? ' (reduced)'
        : ''

    const response: TransitionType[] = [
        `${currentTemplate} => ${targetTemplate}${reduced}`,
        `${targetTemplate} <= ${currentTemplate}${reduced}`,
        `${currentTemplate} <=> ${targetTemplate}${reduced}`,
    ]

    if (currentTemplate !== targetTemplate) {
        response.push(`${targetTemplate} <=> ${currentTemplate}${reduced}`)
    }

    if (targetTemplate !== '*' && replaceStart) {
        response.push(...constructPossibleTransitions(currentTemplate, '*', false))
    }
    if (currentTemplate !== '*' && replaceStart) {
        response.push(...constructPossibleTransitions('*', targetTemplate, false))
    }
    if (currentTemplate !== '*' && targetTemplate !== '*' && replaceStart) {
        response.push(...constructPossibleTransitions('*', '*', false))
    }

    return response
}
