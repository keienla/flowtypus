import {
    CONTAINER_ATTR,
    VIEW_ATTR,
    TARGET_TEMPLATE_ATTR,
    OLD_VIEW_ATTR,
    NEW_VIEW_ATTR,
    DISABLED_LINK_ATTR,
    SCRIPTS_RELOAD_ATTR,
    PRE_FETCHED,
} from '../../src/const'
import {
    getContainer,
    getView,
    getParsedHTML,
    getTemplateName,
    getTargetTemplateName,
    updateLang,
    mergeHead,
    updateAttr,
    setNewContent,
    deleteOldContent,
    getNavigationLinks,
    getScriptsToReload,
    prefetchUrl,
} from '../../src/utils/dom'
// import * as util from 'util'

describe('Check if dom.getParsedHTML return a parsed HTML element', () => {
    test('Check if send a string create a Document', () => {
        const title: string = 'My Title'
        const body: string = '<span>My body content</span>'
        const documentString: string = `<html><title>${title}</title><body>${body}</body></html>`
        const document: Document = getParsedHTML(documentString)

        expect(document instanceof Document).toBe(true)
        expect(document.title).toBe(title)
        expect(document.body.innerHTML).toBe(body)
        expect(document.body.firstElementChild?.tagName).toBe('SPAN')
        expect(document.body.firstElementChild?.innerHTML).toBe('My body content')
        expect(document.body.children.length).toBe(1)
    })

    test('Check if send juste content of body as string return a good document', () => {
        const body: string = '<span>Hello</span>'
        const document: Document = getParsedHTML(body)

        expect(document instanceof Document).toBe(true)
        expect(document.title).toBe('')
        expect(document.body.innerHTML).toBe(body)
        expect(document.body.firstElementChild?.tagName).toBe('SPAN')
        expect(document.body.firstElementChild?.innerHTML).toBe('Hello')
        expect(document.body.children.length).toBe(1)
    })

    test('Check if send a document return the same document', () => {
        const document: Document = getParsedHTML('Hello World')
        const sameDocument: Document = getParsedHTML(document)

        expect(sameDocument).toBe(document)
    })

    test('Check if send anything that is not a string return an empty document', () => {
        const badDocument: Document = getParsedHTML(15 as unknown as string)
        expect(badDocument instanceof Document).toBe(true)
        expect(badDocument.title).toBe('')
        expect(badDocument.body.innerHTML).toBe('15')

        function fn(el: string): string {
            return el + 'empty'
        }
        const badDocument2: Document = getParsedHTML(fn as unknown as string)
        expect(badDocument2 instanceof Document).toBe(true)
        expect(badDocument2.title).toBe('')
        expect(badDocument2.body.innerHTML).toBe(fn.toString())
    })
})

describe('Check if dom.getContainer return the HTML container', () => {
    test(`Check with an element with [${CONTAINER_ATTR}] attr`, () => {
        const contentAttr: string = 'Inside Container'
        const document: Document = getParsedHTML(`<div ${CONTAINER_ATTR}>${contentAttr}</div>`)
        const container: HTMLElement | null = getContainer(document)

        expect(container).not.toBeNull()
        expect(container?.innerHTML).toBe(contentAttr)

        const document2: Document = getParsedHTML(
            `<div>Not container<div ${CONTAINER_ATTR}>${contentAttr}</div></div>`
        )
        const container2: HTMLElement | null = getContainer(document2)

        expect(container2).not.toBeNull()
        expect(container2?.innerHTML).toBe(contentAttr)
    })

    test(`Check return null with NO element with [${CONTAINER_ATTR}] attr`, () => {
        const contentAttr: string = 'Inside Container'
        const document: Document = getParsedHTML(
            `<div>Not container<div>${contentAttr}</div></div>`
        )
        const container: HTMLElement | null = getContainer(document)

        expect(container).toBeNull()
    })

    test('Check return null when not sending a Document element', () => {
        const container: HTMLElement | null = getContainer('Hello' as unknown as Document)

        expect(container).toBeNull()
    })
})

describe('Check if dom.getView return the HTML view', () => {
    test(`Check if an element with [${VIEW_ATTR}] attr direct child of div with [${CONTAINER_ATTR}] attr return the view`, () => {
        const contentAttr: string = 'Inside content'
        const document: Document = getParsedHTML(
            `<div ${CONTAINER_ATTR}><div ${VIEW_ATTR}>${contentAttr}</div></div>`
        )
        const content: HTMLElement | null = getView(document)

        expect(content).not.toBeNull()
        expect(content?.innerHTML).toBe(contentAttr)
    })

    test(`Check if an element with [${VIEW_ATTR}] attr direct child of div with [${CONTAINER_ATTR}] attr without [${OLD_VIEW_ATTR}] return null`, () => {
        const contentAttr: string = 'Inside content'
        const document: Document = getParsedHTML(
            `<div ${CONTAINER_ATTR}><div ${VIEW_ATTR} ${OLD_VIEW_ATTR}>${contentAttr}</div></div>`
        )
        const content: HTMLElement | null = getView(document)

        expect(content).toBeNull()
    })

    test(`Check if an element with [${VIEW_ATTR}] attr with two direct children of div with [${CONTAINER_ATTR}] attr and one [${OLD_VIEW_ATTR}] return the view without [${OLD_VIEW_ATTR}]`, () => {
        const oldContentAttr: string = 'old content'
        const newCcontentAttr: string = 'New content'
        const document: Document = getParsedHTML(
            `<div ${CONTAINER_ATTR}><div ${VIEW_ATTR} ${OLD_VIEW_ATTR}>${oldContentAttr}</div><div ${VIEW_ATTR}>${newCcontentAttr}</div></div>`
        )
        const content: HTMLElement | null = getView(document)

        expect(content).not.toBeNull()
        expect(content?.innerHTML).toBe(newCcontentAttr)
    })

    test(`Check return null with an element with [${VIEW_ATTR}] attr but no direct parent with [${CONTAINER_ATTR}] attr`, () => {
        const contentAttr: string = 'Inside content'

        const document1: Document = getParsedHTML(
            `<div><div ${VIEW_ATTR}>${contentAttr}</div></div>`
        )
        const content1: HTMLElement | null = getView(document1)

        expect(content1).toBeNull()

        const document2: Document = getParsedHTML(
            `<div ${CONTAINER_ATTR}><div><div ${VIEW_ATTR}>${contentAttr}</div></div></div>`
        )
        const content2: HTMLElement | null = getView(document2)

        expect(content2).toBeNull()
    })

    test(`Check return null with NO element with [${VIEW_ATTR}] attr`, () => {
        const contentAttr: string = 'Inside content'
        const document: Document = getParsedHTML(`<div>Not content<div>${contentAttr}</div></div>`)
        const content: HTMLElement | null = getView(document)

        expect(content).toBeNull()
    })

    test('Check return null when not sending a Document element', () => {
        const content: HTMLElement | null = getView('Hello' as unknown as Document)

        expect(content).toBeNull()
    })
})

describe('Check if dom.getTemplateName return the name of the view', () => {
    test('Check if view with name return the good name', () => {
        const templateName: string = 'my-template-name'
        const document: Document = getParsedHTML(
            `<div ${CONTAINER_ATTR}><div ${VIEW_ATTR}="${templateName}">Hello</div></div>`
        )
        const name: string | null = getTemplateName(document)

        expect(name).not.toBeNull()
        expect(name).toBe(templateName)
    })

    test('Check if an empty name return null', () => {
        const document: Document = getParsedHTML(
            `<div ${CONTAINER_ATTR}><div ${VIEW_ATTR}=""></div></div>`
        )
        const name: string | null = getTemplateName(document)

        expect(name).toBeNull()

        const document2: Document = getParsedHTML(
            `<div ${CONTAINER_ATTR}><div ${VIEW_ATTR}></div></div>`
        )
        const name2: string | null = getTemplateName(document2)

        expect(name2).toBeNull()
    })

    test('Check if no container return null', () => {
        const document: Document = getParsedHTML(`<div ${VIEW_ATTR}="hello"></div>`)
        const name: string | null = getTemplateName(document)

        expect(name).toBeNull()
    })

    test('Check if view with name but with attribute ' + OLD_VIEW_ATTR + ' return null', () => {
        const document: Document = getParsedHTML(
            `<div ${CONTAINER_ATTR}><div ${VIEW_ATTR}="hello" ${OLD_VIEW_ATTR}></div></div>`
        )
        const name: string | null = getTemplateName(document)

        expect(name).toBeNull()
    })
})

describe('Check if dom.getTargetTemplateName return value of the target template', () => {
    test('Extract the template target value', () => {
        const templateName: string = 'my-template'
        const element: HTMLElement = document.createElement('a')
        element.setAttribute('href', '/')
        element.setAttribute(TARGET_TEMPLATE_ATTR, templateName)
        element.setAttribute('class', 'my-link')

        const result = getTargetTemplateName(element)

        expect(result).not.toBeNull()
        expect(result).toBe(templateName)
    })

    test('If template value is empty must return null', () => {
        const element: HTMLElement = document.createElement('a')
        element.setAttribute(TARGET_TEMPLATE_ATTR, '')
        element.setAttribute('href', '/')

        const result = getTargetTemplateName(element)

        expect(result).toBeNull()
    })

    test('If no template attr must return null', () => {
        const element: HTMLElement = document.createElement('a')
        element.setAttribute('href', '/')
        element.setAttribute('class', 'my-class')

        const result = getTargetTemplateName(element)

        expect(result).toBeNull()
    })

    test('If no element must return null', () => {
        expect(getTargetTemplateName(null)).toBeNull()
        expect(getTargetTemplateName(undefined as unknown as any)).toBeNull()
        expect(getTargetTemplateName('Hello' as unknown as any)).toBeNull()
    })
})

describe('Check if dom.updateAttr replace the attribute with value of attribute of another element', () => {
    test('Update attr if both div with same attr but different value', () => {
        const div1: HTMLElement = document.createElement('div')
        div1.setAttribute('data-attribute', 'old')
        const div2: HTMLElement = document.createElement('div')
        div2.setAttribute('data-attribute', 'new')

        expect(div1.getAttribute('data-attribute')).toBe('old')
        expect(div2.getAttribute('data-attribute')).toBe('new')

        updateAttr(div2, div1, 'data-attribute')

        expect(div1.getAttribute('data-attribute')).toBe('new')
        expect(div2.getAttribute('data-attribute')).toBe('new')
    })

    test("Set an empty value if second attribute doesn't have a value or does't exist", () => {
        const div1: HTMLElement = document.createElement('div')
        div1.setAttribute('data-attribute', 'old')
        const div2: HTMLElement = document.createElement('div')

        expect(div1.getAttribute('data-attribute')).toBe('old')
        expect(div2.getAttribute('data-attribute')).toBeNull()

        updateAttr(div2, div1, 'data-attribute')

        expect(div1.getAttribute('data-attribute')).toBe('')
        expect(div2.getAttribute('data-attribute')).toBeNull()
    })

    test("Set a default value if second attribute doesn't have a value or does't exist", () => {
        const div1: HTMLElement = document.createElement('div')
        div1.setAttribute('data-attribute', 'old')
        const div2: HTMLElement = document.createElement('div')

        expect(div1.getAttribute('data-attribute')).toBe('old')
        expect(div2.getAttribute('data-attribute')).toBeNull()

        updateAttr(div2, div1, 'data-attribute', 'default')

        expect(div1.getAttribute('data-attribute')).toBe('default')
        expect(div2.getAttribute('data-attribute')).toBeNull()
    })
})

describe('Check if dom.updateLang update the lang attr of the currentDocument param given', () => {
    test('A currentDocument must have the newDocument lang attr and change it if currentDocument already have a lang attr', () => {
        const currentDocument1 = getParsedHTML(
            `<html lang="de"><head></head><body>currentDocument1</body></html>`
        )
        const newDocument1 = getParsedHTML(
            `<html lang="en"><head></head><body>newDocument1</body></html>`
        )
        updateLang(newDocument1, currentDocument1)

        expect(currentDocument1.children[0].getAttribute('lang')).not.toBe('de')
        expect(currentDocument1.children[0].getAttribute('lang')).toBe('en')
        expect(currentDocument1.body.innerHTML).toBe('currentDocument1')

        ////////////////////////////////////////

        const currentDocument2 = getParsedHTML(
            `<html><head></head><body>currentDocument2</body></html>`
        )
        const newDocument2 = getParsedHTML(
            `<html lang="fr"><head></head><body>newDocument2</body></html>`
        )
        updateLang(newDocument2, currentDocument2)

        expect(currentDocument2.children[0].getAttribute('lang')).not.toBe('')
        expect(currentDocument2.children[0].getAttribute('lang')).toBe('fr')
        expect(currentDocument2.body.innerHTML).toBe('currentDocument2')

        ///////////////////////////////////////

        const currentDocument3 = getParsedHTML(
            `<html lang="tv"><head></head><body>currentDocument3</body></html>`
        )
        const newDocument3 = getParsedHTML(`<html><head></head><body>newDocument3</body></html>`)
        updateLang(newDocument3, currentDocument3)

        expect(currentDocument3.children[0].getAttribute('lang')).not.toBe('tv')
        expect(currentDocument3.children[0].getAttribute('lang')).toBe('')
        expect(currentDocument3.body.innerHTML).toBe('currentDocument3')
    })

    test('A currentDocument must have the newDocument dir attr and change it if currentDocument already have a dir attr', () => {
        const currentDocument1 = getParsedHTML(
            `<html dir="ltr"><head></head><body>currentDocument1</body></html>`
        )
        const newDocument1 = getParsedHTML(
            `<html dir="rtl"><head></head><body>newDocument1</body></html>`
        )
        updateLang(newDocument1, currentDocument1)

        expect(currentDocument1.children[0].getAttribute('dir')).not.toBe('ltr')
        expect(currentDocument1.children[0].getAttribute('dir')).toBe('rtl')
        expect(currentDocument1.body.innerHTML).toBe('currentDocument1')

        ////////////////////////////////////////

        const currentDocument2 = getParsedHTML(
            `<html><head></head><body>currentDocument2</body></html>`
        )
        const newDocument2 = getParsedHTML(
            `<html dir="ltr"><head></head><body>newDocument2</body></html>`
        )
        updateLang(newDocument2, currentDocument2)

        expect(currentDocument2.children[0].getAttribute('dir')).not.toBe('')
        expect(currentDocument2.children[0].getAttribute('dir')).toBe('ltr')
        expect(currentDocument2.body.innerHTML).toBe('currentDocument2')

        ///////////////////////////////////////

        const currentDocument3 = getParsedHTML(
            `<html dir="rtl"><head></head><body>currentDocument3</body></html>`
        )
        const newDocument3 = getParsedHTML(`<html><head></head><body>newDocument3</body></html>`)
        updateLang(newDocument3, currentDocument3)

        expect(currentDocument3.children[0].getAttribute('dir')).not.toBe('rtl')
        expect(currentDocument3.children[0].getAttribute('dir')).toBe('ltr')
        expect(currentDocument3.body.innerHTML).toBe('currentDocument3')
    })
})

describe('Check if dom.mergeHead remove the head tag not used in new document and insert new tag in new document', () => {
    const currentDocument: Document = getParsedHTML(`
        <html><head>
            <title>My Title</title>
            <meta name="description" content="My description">
            <meta content="hello, world" name="keywords">
            <meta name="author" content="Thibault Meyer">
        </head><body>currentDocument</body></html>
    `)

    const newDocument: Document = getParsedHTML(`
        <html><head>
            <title>My Title</title>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta content="My new description" name="description">
            <meta name="keywords" content="hello, world">
        </head><body>currentDocument</body></html>
    `)

    const defaultCurrentDocumentHeadTags = [...Array.from(currentDocument.head.children)]
    const defaultNewDocumentHeadTags = [...Array.from(newDocument.head.children)]

    mergeHead(newDocument, currentDocument)

    const newCurrentDocumentHeadTags = [...Array.from(currentDocument.head.children)]

    test('Check in newDocument head tags && newCurrentDocumentHeadTags head tags length are the same', () => {
        expect(defaultCurrentDocumentHeadTags).not.toHaveLength(newCurrentDocumentHeadTags.length)
        expect(newCurrentDocumentHeadTags).toHaveLength(defaultNewDocumentHeadTags.length)
    })

    test('Check if tags in head are keeped if theire are the same (same content + same attrs + same attrs values + same tag)', () => {
        expect(newCurrentDocumentHeadTags.find((e) => e.tagName === 'TITLE')).toBeDefined()
        expect(newCurrentDocumentHeadTags.find((e) => e.tagName === 'TITLE')).toBe(
            defaultCurrentDocumentHeadTags.find((e) => e.tagName === 'TITLE')
        )

        expect(
            newCurrentDocumentHeadTags.find((e) => e.getAttribute('name') === 'keywords')
        ).toBeDefined()
        expect(newCurrentDocumentHeadTags.find((e) => e.getAttribute('name') === 'keywords')).toBe(
            defaultCurrentDocumentHeadTags.find((e) => e.getAttribute('name') === 'keywords')
        )

        expect(
            newCurrentDocumentHeadTags.find((e) => e.getAttribute('name') === 'description')
        ).toBeDefined()
        expect(
            newCurrentDocumentHeadTags.find((e) => e.getAttribute('name') === 'description')
        ).not.toBe(
            defaultCurrentDocumentHeadTags.find((e) => e.getAttribute('name') === 'description')
        )

        expect(
            newCurrentDocumentHeadTags.find((e) => e.getAttribute('name') === 'author')
        ).not.toBe(defaultCurrentDocumentHeadTags.find((e) => e.getAttribute('name') === 'author'))
    })

    test('Check if tags in old current head not in new head are removed', () => {
        expect(
            defaultCurrentDocumentHeadTags.find((e) => e.getAttribute('name') === 'author')
        ).toBeDefined()
        expect(newCurrentDocumentHeadTags.find((e) => e.getAttribute('name') === 'author')).toBe(
            undefined
        )
    })

    test('Check if tags in head are insered', () => {
        expect(
            newCurrentDocumentHeadTags.find((e) => e.getAttribute('name') === 'description')
        ).toBeDefined()
        expect(
            newCurrentDocumentHeadTags.find((e) => e.getAttribute('name') === 'description')
        ).toBe(defaultNewDocumentHeadTags.find((e) => e.getAttribute('name') === 'description'))

        expect(
            newCurrentDocumentHeadTags.find((e) => e.getAttribute('name') === 'viewport')
        ).toBeDefined()
        expect(newCurrentDocumentHeadTags.find((e) => e.getAttribute('name') === 'viewport')).toBe(
            defaultNewDocumentHeadTags.find((e) => e.getAttribute('name') === 'viewport')
        )

        expect(newCurrentDocumentHeadTags.find((e) => e.hasAttribute('charset'))).toBeDefined()
        expect(newCurrentDocumentHeadTags.find((e) => e.hasAttribute('charset'))).toBe(
            defaultNewDocumentHeadTags.find((e) => e.hasAttribute('charset'))
        )
    })
})

describe('Check if dom.setNewContent update the current dom with the view of new dom', () => {
    test('Set a new content must add the view after the old view', () => {
        const currentDOM: Document = getParsedHTML(
            `<div ${CONTAINER_ATTR}><div ${VIEW_ATTR}="current">Hello</div><span>I'm a span</span></div>`
        )
        const newDOM: Document = getParsedHTML(
            `<div ${CONTAINER_ATTR}><div ${VIEW_ATTR}="new">new</div></div>`
        )

        setNewContent(newDOM, currentDOM)

        const oldView: HTMLElement | null = currentDOM.querySelector(`[${OLD_VIEW_ATTR}]`)
        const newView: HTMLElement | null = getView(currentDOM)

        expect(oldView).toBeDefined()
        expect(oldView?.innerHTML).toBe('Hello')
        expect(oldView?.getAttribute(VIEW_ATTR)).toBe('current')
        expect(newView).toBeDefined()
        expect(newView?.innerHTML).toBe('new')
        expect(newView?.getAttribute(VIEW_ATTR)).toBe('new')
        expect(newView?.hasAttribute(NEW_VIEW_ATTR)).toBeTruthy()

        expect(oldView?.nextSibling).toBe(newView)
    })

    test('Must throw an error if no view/container', () => {
        const currentDOM1: Document = getParsedHTML(
            `<div ${VIEW_ATTR}="current">Hello</div><span>I'm a span</span>`
        )
        const newDOM1: Document = getParsedHTML(
            `<div ${CONTAINER_ATTR}><div ${VIEW_ATTR}="new">new</div></div>`
        )

        expect(() => {
            setNewContent(newDOM1, currentDOM1)
        }).toThrow()

        const currentDOM2: Document = getParsedHTML(
            `<div ${CONTAINER_ATTR}><div>Hello</div><span>I'm a span</span></div>`
        )
        const newDOM2: Document = getParsedHTML(
            `<div ${CONTAINER_ATTR}><div ${VIEW_ATTR}="new">new</div></div>`
        )

        expect(() => {
            setNewContent(newDOM2, currentDOM2)
        }).toThrow()

        const currentDOM3: Document = getParsedHTML(
            `<div ${CONTAINER_ATTR}><div ${VIEW_ATTR}="current">Hello</div><span>I'm a span</span></div>`
        )
        const newDOM3: Document = getParsedHTML(`<div><div ${VIEW_ATTR}="new">new</div></div>`)

        expect(() => {
            setNewContent(newDOM3, currentDOM3)
        }).toThrow()

        const currentDOM4: Document = getParsedHTML(
            `<div ${CONTAINER_ATTR}><div ${VIEW_ATTR}="current">Hello</div><span>I'm a span</span></div>`
        )
        const newDOM4: Document = getParsedHTML(`<div ${CONTAINER_ATTR}><div>new</div></div>`)

        expect(() => {
            setNewContent(newDOM4, currentDOM4)
        }).toThrow()
    })
})

describe('Check if dom.deleteOldContent remove the old view and keep the new', () => {
    test('Check if old view is deleted to keep the new view', () => {
        const currentDOM: Document = getParsedHTML(
            `<div ${CONTAINER_ATTR}><div ${VIEW_ATTR}="current">Hello</div><span>I'm a span</span></div>`
        )
        const newDOM: Document = getParsedHTML(
            `<div ${CONTAINER_ATTR}><div ${VIEW_ATTR}="new">new</div></div>`
        )

        setNewContent(newDOM, currentDOM)
        deleteOldContent(currentDOM)

        const oldView: HTMLElement | null = currentDOM.querySelector(`[${OLD_VIEW_ATTR}]`)
        const newView: HTMLElement | null = getView(currentDOM)

        expect(oldView).toBeNull()
        expect(newView).toBeDefined()
        expect(newView?.innerHTML).toBe('new')
        expect(newView?.getAttribute(VIEW_ATTR)).toBe('new')
        expect(newView?.hasAttribute(NEW_VIEW_ATTR)).toBeFalsy()
    })
})

describe('Check if dom.getNavigationLinks get all links for navigation', () => {
    const anchorLink: string = '#top'
    const simpleLink: string = '/hello/world'
    const simpleLink2: string = 'page'
    const outsideLink: string = 'https://duckduckgo.com/'
    const sameDomain: string = 'http://localhost/flowtypus'
    const dom: Document = getParsedHTML(`
        <a href="${anchorLink}">Anchor link</a>
        <a href="${simpleLink}">Simple link</a>
        <a target="_self" href="${simpleLink2}">Link to simple page but with target _self</a>
        <a target="_blank" href="${simpleLink2}">Link to simple page but with target _blank</a>
        <a href="${outsideLink}">Link to outside</a>
        <a href="${sameDomain}">To same domain</a>
        <a href="/disabled" ${DISABLED_LINK_ATTR}>Disabled link</a>
    `)

    const allLinks = Array.from<HTMLAnchorElement>(dom.querySelectorAll('a'))
    const navigationLinks = getNavigationLinks(dom)

    test('Check if get all good links length', () => {
        expect(navigationLinks).toHaveLength(3)
    })

    test("Check if doesn't get the link with anchor", () => {
        function find(l: HTMLAnchorElement): boolean {
            return l.href === anchorLink || l.href === `about:blank${anchorLink}`
        }
        const link = allLinks.find((l) => find(l))
        expect(link).toBeDefined()
        const navLink = navigationLinks.find((l) => find(l))
        expect(navLink).toBeUndefined()
    })

    test('Check if get simple link as "/???"', () => {
        const navLink = navigationLinks.find(
            (l) => l.href === simpleLink && !l.hasAttribute('target')
        )
        expect(navLink).toBeDefined()
    })

    test('Check if get simple link without "/" as first character and with target = "_self"', () => {
        const navLink = navigationLinks.find(
            (l) => l.href === simpleLink2 && l.getAttribute('target') !== '_blank'
        )
        expect(navLink).toBeDefined()
    })

    test('Check if doesn\'t get simple link without "/" as first charater but with target != "_self"', () => {
        function find(l: HTMLAnchorElement): boolean {
            return l.href === simpleLink2 && l.getAttribute('target') === '_blank'
        }
        const link = allLinks.find((l) => find(l))
        expect(link).toBeDefined()
        const navLink = navigationLinks.find((l) => find(l))
        expect(navLink).toBeUndefined()
    })

    test("Check if doesn't get link with different domain", () => {
        function find(l: HTMLAnchorElement): boolean {
            return l.href === outsideLink
        }
        const link = allLinks.find((l) => find(l))
        expect(link).toBeDefined()
        const navLink = navigationLinks.find((l) => find(l))
        expect(navLink).toBeUndefined()
    })

    test('Check if get link with same domain', () => {
        const navLink = navigationLinks.find((l) => l.href === sameDomain)
        expect(navLink).toBeDefined()
    })

    test(`Check if doesn't get link with ${DISABLED_LINK_ATTR} attribute`, () => {
        function find(l: HTMLAnchorElement): boolean {
            return l.hasAttribute(DISABLED_LINK_ATTR)
        }
        const link = allLinks.find((l) => find(l))
        expect(link).toBeDefined()
        const navLink = navigationLinks.find((l) => find(l))
        expect(navLink).toBeUndefined()
    })
})

describe(`Check if dom.getScriptsToReload get all links with attr "${SCRIPTS_RELOAD_ATTR}"`, () => {
    const dom = getParsedHTML(`
    <html>
        <head>
            <script src=""></script>
            <script src="" ${SCRIPTS_RELOAD_ATTR}></script>
            <script ${SCRIPTS_RELOAD_ATTR}></script>
            <script></script>
        </head>
        <body>
            <script src="" ${SCRIPTS_RELOAD_ATTR}></script>
            <script src=""></script>
            <script></script>
            <script ${SCRIPTS_RELOAD_ATTR}></script>
        </body>
    </html>
    `)
    const scripts = getScriptsToReload(dom)

    test('Check if get the good length of <script>', () => {
        expect(scripts).toHaveLength(4)
    })

    test(`Check if all scripts have attr ${SCRIPTS_RELOAD_ATTR}`, () => {
        expect(scripts.every((script) => script.hasAttribute(SCRIPTS_RELOAD_ATTR))).toBeTruthy()
    })
})

describe('Check if dom.prefetchUrl insert link element in head with good url', () => {
    const dom = getParsedHTML(`
    <html>
        <head>
        </head>
        <body>
            <a href="https://github.com/keienla/flowtypus">FLOWTYPUS!!!</a>
        </body>
    </html>
    `)
    const href = dom.body.querySelector('a')?.getAttribute('href') as string

    afterAll(() => {
        PRE_FETCHED.length = 0
    })

    test('Check if there is no link element in head at start', () => {
        expect(dom.head.querySelectorAll('link').length).toBe(0)
        expect(PRE_FETCHED).toHaveLength(0)
    })

    test('Check if insert link with good attributes in head', () => {
        prefetchUrl(href, dom)

        const links = dom.head.querySelectorAll('link')

        expect(links).toHaveLength(1)
        expect(PRE_FETCHED).toHaveLength(1)
        expect(PRE_FETCHED.indexOf(href)).toBe(0)
        expect(links[0].getAttribute('href')).toBe(href)
        expect(links[0].getAttribute('rel')).toBe('prefetch')
        expect(links[0].getAttribute('as')).toBe('document')
    })

    test("Check if trying to insert the same url doesn't create a new link", () => {
        prefetchUrl(href, dom)

        const links = dom.head.querySelectorAll('link')

        expect(links).toHaveLength(1)
        expect(PRE_FETCHED).toHaveLength(1)
        expect(PRE_FETCHED.indexOf(href)).toBe(0)
    })
})
