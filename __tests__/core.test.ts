import { CACHE, DEFAULT_TRANSITION, FLOW_CORE } from './../src/const'
import { clearAllCache, clearCacheForUrl, findTransition, setTransition } from './../src/core'

describe('check if methods to clear cache work', () => {
    beforeEach(() => {
        CACHE.clear()

        CACHE.set('http://localhost/test', 'String')
        CACHE.set('http://localhost/', 'String')
    })

    afterAll(() => {
        clearAllCache()
    })

    test('Test core.clearAllCache to check if remove all elements', () => {
        expect(CACHE.size).toBe(2)

        clearAllCache()

        expect(CACHE.size).toBe(0)
    })

    test('Test core.clearCacheForUrl remove the good entry', () => {
        expect(CACHE.size).toBe(2)

        clearCacheForUrl('/')

        expect(CACHE.size).toBe(1)
        expect(CACHE.has('http://localhost/')).toBeFalsy()
        expect(CACHE.has('http://localhost/test')).toBeTruthy()
    })
})

describe('check if core.setTransition add a new transition', () => {
    beforeEach(() => {
        FLOW_CORE.transitions.clear()
    })

    afterAll(() => {
        FLOW_CORE.transitions.clear()
    })

    test('Check in addind label with too much space add the correctly-formated label', () => {
        setTransition(
            ' hello       <=     world   ',
            () => Promise.resolve(),
            () => Promise.resolve()
        )

        expect(FLOW_CORE.transitions.has('hello <= world')).toBeTruthy()
        expect(FLOW_CORE.transitions.size).toBe(1)
    })

    test('Check if transition with reduceMotion parameter update correctly the name of transition', () => {
        setTransition(
            ' hello       <=     world   ',
            () => Promise.resolve(),
            () => Promise.resolve(),
            true
        )

        expect(FLOW_CORE.transitions.has('hello <= world')).toBeFalsy()
        expect(FLOW_CORE.transitions.has('hello <= world (reduced)')).toBeTruthy()
        expect(FLOW_CORE.transitions.size).toBe(1)
    })
})

describe('check if core.findTransition can find the correct transition', () => {
    beforeAll(() => {
        FLOW_CORE.transitions.clear()

        // Set transition is shuffle to check if get still good order
        setTransition(`* => to`, DEFAULT_TRANSITION.out, DEFAULT_TRANSITION.in)
        setTransition(`to <= *`, DEFAULT_TRANSITION.out, DEFAULT_TRANSITION.in)
        setTransition(`from => *`, DEFAULT_TRANSITION.out, DEFAULT_TRANSITION.in)
        setTransition(`from <=> to`, DEFAULT_TRANSITION.out, DEFAULT_TRANSITION.in)
        setTransition(`* <= from`, DEFAULT_TRANSITION.out, DEFAULT_TRANSITION.in)
        setTransition(`* <=> *`, DEFAULT_TRANSITION.out, DEFAULT_TRANSITION.in)
        setTransition(`to <=> from`, DEFAULT_TRANSITION.out, DEFAULT_TRANSITION.in)
        setTransition(`from => to`, DEFAULT_TRANSITION.out, DEFAULT_TRANSITION.in)
        setTransition(`* <= *`, DEFAULT_TRANSITION.out, DEFAULT_TRANSITION.in)
        setTransition(`* <=> from`, DEFAULT_TRANSITION.out, DEFAULT_TRANSITION.in)
        setTransition(`from <=> *`, DEFAULT_TRANSITION.out, DEFAULT_TRANSITION.in)
        setTransition(`* <=> to`, DEFAULT_TRANSITION.out, DEFAULT_TRANSITION.in)
        setTransition(`to <= from`, DEFAULT_TRANSITION.out, DEFAULT_TRANSITION.in)
        setTransition(`* => *`, DEFAULT_TRANSITION.out, DEFAULT_TRANSITION.in)
        setTransition(`to <=> *`, DEFAULT_TRANSITION.out, DEFAULT_TRANSITION.in)
    })

    afterAll(() => {
        FLOW_CORE.transitions.clear()
    })

    test('Check if return default transition if no transition found', () => {
        const result = findTransition('nothing', 'nothing-else')

        expect(result.transitionKey).toBe('* => *')
        expect(result.transition.in).toBe(DEFAULT_TRANSITION.in)
        expect(result.transition.out).toBe(DEFAULT_TRANSITION.out)
    })

    test('Check if return transition in good order', () => {
        expect(findTransition('from', 'to').transitionKey).toBe('from => to')
        FLOW_CORE.transitions.delete('from => to')

        expect(findTransition('from', 'to').transitionKey).toBe('to <= from')
        FLOW_CORE.transitions.delete('to <= from')

        expect(findTransition('from', 'to').transitionKey).toBe('from <=> to')
        FLOW_CORE.transitions.delete('from <=> to')

        expect(findTransition('from', 'to').transitionKey).toBe('to <=> from')
        FLOW_CORE.transitions.delete('to <=> from')

        expect(findTransition('from', 'to').transitionKey).toBe('from => *')
        FLOW_CORE.transitions.delete('from => *')

        expect(findTransition('from', 'to').transitionKey).toBe('* <= from')
        FLOW_CORE.transitions.delete('* <= from')

        expect(findTransition('from', 'to').transitionKey).toBe('from <=> *')
        FLOW_CORE.transitions.delete('from <=> *')

        expect(findTransition('from', 'to').transitionKey).toBe('* <=> from')
        FLOW_CORE.transitions.delete('* <=> from')

        expect(findTransition('from', 'to').transitionKey).toBe('* => to')
        FLOW_CORE.transitions.delete('* => to')

        expect(findTransition('from', 'to').transitionKey).toBe('to <= *')
        FLOW_CORE.transitions.delete('to <= *')

        expect(findTransition('from', 'to').transitionKey).toBe('* <=> to')
        FLOW_CORE.transitions.delete('* <=> to')

        expect(findTransition('from', 'to').transitionKey).toBe('to <=> *')
        FLOW_CORE.transitions.delete('to <=> *')

        expect(findTransition('from', 'to').transitionKey).toBe('* => *')
        FLOW_CORE.transitions.delete('* => *')

        expect(findTransition('from', 'to').transitionKey).toBe('* <= *')
        FLOW_CORE.transitions.delete('* <= *')

        expect(findTransition('from', 'to').transitionKey).toBe('* <=> *')
        FLOW_CORE.transitions.delete('* <=> *')

        expect(findTransition('from', 'to').transitionKey).toBe('* <=> *')
    })
})
