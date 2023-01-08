import { compare, constructPossibleTransitions } from '../../src/utils/generic'

describe('check if generic.compare return the good object structure and result', () => {
    test('Check if return good result with array of numbers', () => {
        const array1: number[] = [0, 2, 8, 4, 6, 9, 7, 36, 874, 5, 13]
        const array2: number[] = [9, 7, 3, 66, 8, 1, 4, 0, 6, 712, 7485]
        const response = compare(array1, array2)
        const missing: number[] = [36, 874, 5, 13, 2]
        const commun: number[] = [0, 8, 4, 6, 9, 7]
        const added: number[] = [3, 66, 1, 712, 7485]

        expect(Object.keys(response)).toHaveLength(3)
        expect(Object.keys(response)).toEqual(
            expect.arrayContaining(['commun', 'missing', 'added'])
        )

        expect(Array.isArray(response.missing)).toBeTruthy()
        expect(response.missing).toHaveLength(missing.length)
        expect(response.missing).toEqual(expect.arrayContaining(missing))

        expect(Array.isArray(response.commun)).toBeTruthy()
        expect(response.commun).toHaveLength(commun.length)
        expect(response.commun).toEqual(expect.arrayContaining(commun))

        expect(Array.isArray(response.added)).toBeTruthy()
        expect(response.added).toHaveLength(added.length)
        expect(response.added).toEqual(expect.arrayContaining(added))
    })

    test('Check if return good result if one of array is empty', () => {
        const array: string[] = ['g', 'z', 'a', 'k', 'u', 'u', 'b', 'r', 'md', 'qzdf', 'n']
        const emptyArray: string[] = []
        const response1 = compare(array, emptyArray)

        expect(Object.keys(response1)).toHaveLength(3)
        expect(Object.keys(response1)).toEqual(
            expect.arrayContaining(['commun', 'missing', 'added'])
        )

        expect(Array.isArray(response1.missing)).toBeTruthy()
        expect(response1.missing).toHaveLength(array.length)
        expect(response1.missing).toEqual(expect.arrayContaining(array))

        expect(Array.isArray(response1.commun)).toBeTruthy()
        expect(response1.commun).toHaveLength(0)

        expect(Array.isArray(response1.added)).toBeTruthy()
        expect(response1.added).toHaveLength(0)

        const response2 = compare(emptyArray, array)

        expect(Object.keys(response2)).toHaveLength(3)
        expect(Object.keys(response2)).toEqual(
            expect.arrayContaining(['commun', 'missing', 'added'])
        )

        expect(Array.isArray(response2.missing)).toBeTruthy()
        expect(response2.missing).toHaveLength(0)

        expect(Array.isArray(response2.commun)).toBeTruthy()
        expect(response2.commun).toHaveLength(0)

        expect(Array.isArray(response2.added)).toBeTruthy()
        expect(response2.added).toHaveLength(array.length)
        expect(response2.added).toEqual(expect.arrayContaining(array))
    })

    test('Check if compare two objects with specific filter fn return good result', () => {
        const array1: { id: string }[] = [{ id: 'z' }, { id: 'u' }, { id: 'a' }]
        const array2: { id: string }[] = [
            { id: 'u' },
            { id: 'k' },
            { id: 'z' },
            { id: 'g' },
            { id: 'r' },
        ]
        const response1 = compare(array1, array2, (valueA, valueB) => valueA.id === valueB.id)
        const missing: { id: string }[] = [{ id: 'a' }]
        const commun: { id: string }[] = [{ id: 'u' }, { id: 'z' }]
        const added: { id: string }[] = [{ id: 'k' }, { id: 'g' }, { id: 'r' }]

        expect(Object.keys(response1)).toHaveLength(3)
        expect(Object.keys(response1)).toEqual(
            expect.arrayContaining(['commun', 'missing', 'added'])
        )

        expect(Array.isArray(response1.missing)).toBeTruthy()
        expect(response1.missing).toHaveLength(missing.length)
        expect(response1.missing).toEqual(expect.arrayContaining(missing))

        expect(Array.isArray(response1.commun)).toBeTruthy()
        expect(response1.commun).toHaveLength(commun.length)
        expect(response1.commun).toEqual(expect.arrayContaining(commun))

        expect(Array.isArray(response1.added)).toBeTruthy()
        expect(response1.added).toHaveLength(added.length)
        expect(response1.added).toEqual(expect.arrayContaining(added))

        const response2 = compare(array1, array2)

        expect(Object.keys(response2)).toHaveLength(3)
        expect(Object.keys(response2)).toEqual(
            expect.arrayContaining(['commun', 'missing', 'added'])
        )

        expect(Array.isArray(response2.missing)).toBeTruthy()
        expect(response2.missing).toHaveLength(array1.length)
        expect(response2.missing).toEqual(expect.arrayContaining(array1))

        expect(Array.isArray(response2.commun)).toBeTruthy()
        expect(response2.commun).toHaveLength(0)

        expect(Array.isArray(response2.added)).toBeTruthy()
        expect(response2.added).toHaveLength(array2.length)
        expect(response2.added).toEqual(expect.arrayContaining(array2))
    })
})

Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    })),
})

describe('check if generic.constructPossibleTransitions return all possible transition possible', () => {
    test('If send two strings !== * must return all transitions types possible', () => {
        const oldTemplate: string = 'old-template'
        const targetTemplate: string = 'target-template'
        const transitions = constructPossibleTransitions(oldTemplate, targetTemplate)

        expect(Array.isArray(transitions)).toBeTruthy()
        expect(transitions).toHaveLength(15)

        expect(transitions).toContain(`${oldTemplate} => ${targetTemplate}`)
        expect(transitions).toContain(`${oldTemplate} <=> ${targetTemplate}`)
        expect(transitions).toContain(`${targetTemplate} <= ${oldTemplate}`)
        expect(transitions).toContain(`${targetTemplate} <=> ${oldTemplate}`)

        expect(transitions).toContain(`* => ${targetTemplate}`)
        expect(transitions).toContain(`* <=> ${targetTemplate}`)
        expect(transitions).toContain(`${targetTemplate} <= *`)
        expect(transitions).toContain(`${targetTemplate} <=> *`)

        expect(transitions).toContain(`${oldTemplate} => *`)
        expect(transitions).toContain(`${oldTemplate} <=> *`)
        expect(transitions).toContain(`* <= ${oldTemplate}`)
        expect(transitions).toContain(`* <=> ${oldTemplate}`)

        expect(transitions).toContain(`* => *`)
        expect(transitions).toContain(`* <=> *`)
        expect(transitions).toContain(`* <= *`)
    })

    test('If send one string !== * and one string === * return all transitions types possible', () => {
        const template: string = 'my-template'
        const transitions1 = constructPossibleTransitions(template, '*')

        expect(Array.isArray(transitions1)).toBeTruthy()
        expect(transitions1).toHaveLength(7)

        expect(transitions1).toContain(`${template} => *`)
        expect(transitions1).toContain(`${template} <=> *`)
        expect(transitions1).toContain(`* <= ${template}`)
        expect(transitions1).toContain(`* <=> ${template}`)

        expect(transitions1).toContain(`* => *`)
        expect(transitions1).toContain(`* <=> *`)
        expect(transitions1).toContain(`* <= *`)

        const transitions2 = constructPossibleTransitions('*', template)

        expect(Array.isArray(transitions2)).toBeTruthy()
        expect(transitions2).toHaveLength(7)

        expect(transitions2).toContain(`* => ${template}`)
        expect(transitions2).toContain(`* <=> ${template}`)
        expect(transitions2).toContain(`${template} <= *`)
        expect(transitions2).toContain(`${template} <=> *`)

        expect(transitions2).toContain(`* => *`)
        expect(transitions2).toContain(`* <=> *`)
        expect(transitions2).toContain(`* <= *`)
    })

    test('If send two string === * or empty string return all transitions types possible', () => {
        const transitions1 = constructPossibleTransitions('*', '*')

        expect(Array.isArray(transitions1)).toBeTruthy()
        expect(transitions1).toHaveLength(3)

        expect(transitions1).toContain(`* => *`)
        expect(transitions1).toContain(`* <=> *`)
        expect(transitions1).toContain(`* <= *`)

        const transitions2 = constructPossibleTransitions('', '')

        expect(Array.isArray(transitions2)).toBeTruthy()
        expect(transitions2).toHaveLength(3)

        expect(transitions2).toContain(`* => *`)
        expect(transitions2).toContain(`* <=> *`)
        expect(transitions2).toContain(`* <= *`)

        const transitions3 = constructPossibleTransitions(null, undefined)

        expect(Array.isArray(transitions3)).toBeTruthy()
        expect(transitions3).toHaveLength(3)

        expect(transitions3).toContain(`* => *`)
        expect(transitions3).toContain(`* <=> *`)
        expect(transitions3).toContain(`* <= *`)
    })
})
