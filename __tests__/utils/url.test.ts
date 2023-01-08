import {
    transformToURL,
    getCurrentURL,
    isURL,
    isSameOrigin,
    isSamePath,
    findTargetAnchor,
} from '../../src/utils/url'

describe('check if url.transformToURL transform string to URL if possible', () => {
    const hash: string = '#bottom'
    const hostname: string = 'mozilla.org'
    const port: number = 1414
    const protocol: string = 'https:'
    const pathname: string = '/my-page'
    const searchParams = { hello: 'world' }

    test('if send a URL element must return an URL', () => {
        const url: URL = new URL(
            'https://www.google.com:8080/path/to/any?search=mySearch&filter=12#top'
        )
        const result = transformToURL(url)

        expect(result).not.toBeNull()
        expect(result).toBe(url)
        expect(result).toBeInstanceOf(URL)

        Object.keys(url).forEach((key) => {
            expect(url[key]).toBe(result?.[key])
        })
    })

    test('if send a full string url must return an URL', () => {
        const stringUrl: string = `${protocol}//${hostname}:${port}${pathname}?hello=${searchParams.hello}${hash}`
        const result = transformToURL(stringUrl)

        expect(result).not.toBeNull()
        expect(result).toBeInstanceOf(URL)
        expect(result?.hash).toBe(hash)
        expect(result?.hostname).toBe(hostname)
        expect(result?.host).toBe(hostname + ':' + port)
        expect(result?.href).toBe(stringUrl)
        expect(result?.protocol).toBe(protocol)
        expect(result?.pathname).toBe(pathname)
        expect(result?.search).toBe('?hello=' + searchParams.hello)
        expect(result?.password).toBe('')
        expect(result?.port).toBe(port.toString())
        Object.keys(searchParams).forEach((key) => {
            expect(result?.searchParams?.get(key)).toBe(searchParams[key])
        })
    })

    test('if send only a part of an url without origin must return URL with current origin', () => {
        const stringUrl: string = `${pathname}?hello=${searchParams.hello}${hash}`
        const result = transformToURL(stringUrl)

        expect(() => {
            new URL(stringUrl)
        }).toThrowError()

        expect(result).not.toBeNull()
        expect(result?.hostname).toBe('localhost')
        expect(result?.protocol).toBe('http:')
        expect(result?.port).toBe('')
        expect(result?.hash).toBe(hash)
        expect(result?.pathname).toBe(pathname)
        expect(result?.search).toBe('?hello=' + searchParams.hello)
        expect(result?.password).toBe('')
        Object.keys(searchParams).forEach((key) => {
            expect(result?.searchParams?.get(key)).toBe(searchParams[key])
        })
    })

    test('if send only a part of an url + origin in second parameter must return URL with given origin', () => {
        const hostname2: string = 'www.duckduckgo.com'
        const port2: number = 8080
        const protocol2: string = 'http:'
        const stringUrl: string = `${pathname}?hello=${searchParams.hello}${hash}`
        const origin: string = `${protocol2}//${hostname2}:${port2}`
        const result = transformToURL(stringUrl, origin)

        expect(result).not.toBeNull()
        expect(result).toBeInstanceOf(URL)
        expect(result?.hash).toBe(hash)
        expect(result?.hostname).toBe(hostname2)
        expect(result?.host).toBe(hostname2 + ':' + port2)
        expect(result?.href).toBe(origin + stringUrl)
        expect(result?.protocol).toBe(protocol2)
        expect(result?.pathname).toBe(pathname)
        expect(result?.search).toBe('?hello=' + searchParams.hello)
        expect(result?.password).toBe('')
        expect(result?.port).toBe(port2.toString())
        Object.keys(searchParams).forEach((key) => {
            expect(result?.searchParams?.get(key)).toBe(searchParams[key])
        })

        const result2 = transformToURL(stringUrl, origin + '/hello/world?test=working#truc')

        expect(result2).not.toBeNull()
        expect(result2).toBeInstanceOf(URL)
        expect(result2?.hash).toBe(hash)
        expect(result2?.hostname).toBe(hostname2)
        expect(result2?.host).toBe(hostname2 + ':' + port2)
        expect(result2?.href).toBe(origin + stringUrl)
        expect(result2?.protocol).toBe(protocol2)
        expect(result2?.pathname).toBe(pathname)
        expect(result2?.search).toBe('?hello=' + searchParams.hello)
        expect(result2?.password).toBe('')
        expect(result2?.port).toBe(port2.toString())
        Object.keys(searchParams).forEach((key) => {
            expect(result2?.searchParams?.get(key)).toBe(searchParams[key])
        })
    })

    test('If no parameter given must return null', () => {
        const result = transformToURL(undefined as unknown as any)

        expect(result).toBeNull()

        const resultNull = transformToURL(null)

        expect(resultNull).toBeNull()

        const resultEmpty = transformToURL('')

        expect(resultEmpty).toBeNull()
    })
})

describe('check if url.getCurrentURL return the current url', () => {
    test('url.getCurrentURL must return url with localhost', () => {
        const currentURL = getCurrentURL()

        expect(currentURL).not.toBeNull()
        expect(currentURL?.protocol).toBe('http:')
        expect(currentURL?.hostname).toBe('localhost')
        expect(currentURL?.hash).toBe('')
        expect(currentURL?.password).toBe('')
        expect(currentURL?.pathname).toBe('/')
        expect(currentURL?.search).toBe('')
        expect(currentURL?.port).toBe('')
    })
})

describe('check if url.isURL return true if type is URL', () => {
    test('Must return true if sending an URL', () => {
        const url: URL = new URL('https://wikipedia.org')

        expect(isURL(url)).toBeTruthy()
    })

    test('Must return false if sending else than an URL', () => {
        const stringUrl: string = 'https://wikipedia.org'

        expect(isURL(stringUrl)).toBeFalsy()
        expect(isURL(12)).toBeFalsy()
        expect(isURL(undefined)).toBeFalsy()
        expect(isURL(null)).toBeFalsy()
    })
})

describe('check if url.isSameOrigin return true if sending two url with same origin', () => {
    const url1: string = 'https://duckduckgo.com/?q=mozilla&hps=1&atb=v343-1&ia=web'
    const url2: string = 'https://duckduckgo.com/?q=mdn&atb=v343-1&ia=web'
    const url3: string = 'https://duckduckgo.com/404/'
    const url4: string = 'http://duckduckgo.com/test'
    const url5: string = 'https://developer.mozilla.org/en-US/'

    test('Check if two elements with same origin return true', () => {
        expect(isSameOrigin(url1, url2)).toBeTruthy()
        expect(isSameOrigin(transformToURL(url1), transformToURL(url2))).toBeTruthy()
        expect(isSameOrigin(url1, transformToURL(url2))).toBeTruthy()
        expect(isSameOrigin(transformToURL(url1), url2)).toBeTruthy()
        expect(isSameOrigin(url1, url3)).toBeTruthy()
    })

    test('Check if send two partial URLS (with just path or anything without origin) return true', () => {
        expect(isSameOrigin('/platyflow', '#code')).toBeTruthy()
        expect(isSameOrigin('/platyflow', 'code')).toBeTruthy()
        expect(isSameOrigin('http://localhost/platyflow', '404')).toBeTruthy()
    })

    test('Check if two elements with NOT same origin return false', () => {
        expect(isSameOrigin(url1, url4)).toBeFalsy()
        expect(isSameOrigin(transformToURL(url1), transformToURL(url4))).toBeFalsy()
        expect(isSameOrigin(url1, transformToURL(url4))).toBeFalsy()
        expect(isSameOrigin(transformToURL(url1), url4)).toBeFalsy()

        expect(isSameOrigin(url4, url5)).toBeFalsy()
        expect(isSameOrigin(url3, url5)).toBeFalsy()
        expect(isSameOrigin(url1, null)).toBeFalsy()
        expect(isSameOrigin(url1, 12 as unknown as string)).toBeFalsy()
        expect(isSameOrigin(url1, '/platyflow')).toBeFalsy()
    })
})

describe('check if url.isSamePath return true if sending two url with same path & same search if exist', () => {
    const url1: string = 'https://duckduckgo.com/?q=mozilla&hps=1&atb=v343-1&ia=web'
    const url2: string = 'https://www.ecosia.org/?q=mozilla&hps=1&atb=v343-1&ia=web'
    const url3: string = 'https://localhost/flowtypus/test?platypus=best#top'
    const url4: string = 'http://localhost/flowtypus/test?platypus=best#bottom'
    const url5: string = 'https://localhost/flowtypus/test?platypus=best'
    const url6: string = 'http://localhost/flowtypus/test?platypus=fantastic'
    const url7: string = 'http://localhost/flowtypus'

    test('Check if two element with same path & search return true', () => {
        expect(isSamePath(url1, url2)).toBeTruthy()
        expect(isSamePath(transformToURL(url1), transformToURL(url2))).toBeTruthy()
        expect(isSamePath(url1, transformToURL(url2))).toBeTruthy()
        expect(isSamePath(transformToURL(url1), url2)).toBeTruthy()

        expect(isSamePath(url3, url4)).toBeTruthy()
        expect(isSamePath(url4, url5)).toBeTruthy()
        expect(isSamePath(url7, 'flowtypus')).toBeTruthy()
        expect(isSamePath(url7, '/flowtypus')).toBeTruthy()
        expect(isSamePath('flowtypus', '/flowtypus')).toBeTruthy()
    })

    test('Check if two elements with NOT same path | search return false', () => {
        expect(isSamePath(url1, url3)).toBeFalsy()
        expect(isSamePath(transformToURL(url1), transformToURL(url3))).toBeFalsy()
        expect(isSamePath(url1, transformToURL(url3))).toBeFalsy()
        expect(isSamePath(transformToURL(url1), url3)).toBeFalsy()

        expect(isSamePath(url4, url6)).toBeFalsy()
        expect(isSamePath(url5, url6)).toBeFalsy()
        expect(isSamePath(url6, url7)).toBeFalsy()
    })
})

describe('check if url.findTargetLink return the link element if exist in element or parent to select the HTML', () => {
    test('Check if a HTMLAnchorElement exist as given element or in parent return the HTMLAnchorElement', () => {
        const anchor1: HTMLAnchorElement = document.createElement('a')
        expect(findTargetAnchor(anchor1)).not.toBeNull()
        expect(findTargetAnchor(anchor1)).toBe(anchor1)

        const anchor2: HTMLAnchorElement = document.createElement('a')
        const div1: HTMLElement = document.createElement('div')
        const span1: HTMLElement = document.createElement('span')
        span1.innerHTML = 'Hello World'
        div1.appendChild(span1)
        anchor2.appendChild(div1)

        expect(findTargetAnchor(div1)).not.toBeNull()
        expect(findTargetAnchor(div1)).toBe(anchor2)
        expect(findTargetAnchor(span1)).not.toBeNull()
        expect(findTargetAnchor(span1)).toBe(anchor2)
    })

    test("Check if a HTMLAnchorElement DOESN'T exist as given element or in parent return null", () => {
        const div1: HTMLElement = document.createElement('div')
        div1.setAttribute('href', 'http://localhost/')
        expect(findTargetAnchor(div1)).toBeNull()

        const div2: HTMLElement = document.createElement('div')
        const span1: HTMLElement = document.createElement('span')
        span1.innerHTML = 'Hello World'
        div1.appendChild(span1)

        expect(findTargetAnchor(div2)).toBeNull()
        expect(findTargetAnchor(span1)).toBeNull()
    })
})
