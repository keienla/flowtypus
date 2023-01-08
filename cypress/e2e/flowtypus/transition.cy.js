/// <reference types="cypress" />

describe('Check if transitions works', () => {
    beforeEach(() => {
        // Cypress starts out with a blank slate for each test
        // so we must tell it to visit our website with the `cy.visit()` command.
        // Since we want to visit the same URL at the start of all our tests,
        // we include it in our beforeEach function so that it runs before each test
        cy.visit('/')
    })

    it('Should navigate but keep same container with reference', () => {
        let oldContainer = null
        let oldView = null

        cy.get('[data-flowtypus-container]').then((el) => {
            oldContainer = el[0]
        })

        cy.get('[data-flowtypus-view]').then((el) => {
            oldView = el[0]
        })

        cy.get('[data-flowtypus-view]').should('have.attr', 'data-flowtypus-view', 'home')
        cy.get('nav a').last().click()

        // wait for transition
        cy.wait(500)

        cy.get('[data-flowtypus-container]').then(([newContainer]) => {
            expect(oldContainer).to.equal(newContainer)
        })

        cy.get('[data-flowtypus-view]').then(([newView]) => {
            expect(oldView).to.not.equal(newView)
        })
    })

    it('Check if code reload word', () => {
        // Check if modales contain 1 object
        // i.e code on load work
        cy.get('.modales').should('exist').children().should('have.length', 1)

        cy.get('nav a').last().click()

        // Check if code reload work, if true a new element is added in modales block
        // If code to reload work
        cy.get('.modales').should('exist').children().should('have.length', 2)

        cy.get('nav a').first().click()

        // wait for transition
        cy.wait(500)

        // Check if code reload work, if true a new element is added in modales block
        // If code to reload work
        cy.get('.modales').should('exist').children().should('have.length', 3)
    })

    it('Check if header is added/removed', () => {
        cy.title().should('eq', 'Flowtypus')
        cy.get('meta[name=description]').should(
            'have.attr',
            'content',
            'Flowtypus is, I think, the best tool in the world'
        )
        cy.get('meta[name=keywords]').should('have.attr', 'content', 'flowtypus, platypus, flow')

        cy.get('nav a').last().click()

        // wait for transition
        cy.wait(500)

        cy.title().should('eq', 'Infos')
        cy.get('meta[name=description]').should('not.exist')
        cy.get('meta[name=test]')
            .should('exist')
            .should('have.attr', 'content', 'Just here for tests')
        cy.get('meta[name=keywords]').should('have.attr', 'content', 'Infos')

        // Check if go back top page home
        cy.go('back')

        // wait for transition
        cy.wait(500)

        cy.get('meta[name=test]').should('not.exist')
        cy.get('meta[name=description]').should('exist')
    })

    it('Check if events are launched', () => {
        cy.window().then((window) => {
            let transitionOutStart = false
            let loadingEnd = false
            let loadingIn = false

            const onQueryTransitionOut = (event) => {
                transitionOutStart = true
                window.removeEventListener('flow:transition:out', onQueryTransitionOut)

                expect(event.from.template).to.equal('home')
                expect(event.from.url.pathname).to.equal('/')
                expect(event.from).to.have.property('view')
                expect(event.from.view.hasAttribute('data-flowtypus-view')).to.true
                expect(event.to.template).to.equal('infos')
                expect(event.to.url.pathname).to.equal('/infos')
                expect(event.to).to.not.have.property('view')

                expect(event).to.have.property('container')
                expect(event).to.have.property('link')
                expect(event.link.tagName).to.equal('A')
                expect(event).to.have.property('transitionKey')
                expect(event.transitionKey).to.equal('* <=> *')
            }

            const onQueryLoadingProgress = (event) => {
                expect(event.detail).to.have.property('bytesReceived')
                expect(event.detail).to.have.property('cache')
                expect(event.detail).to.have.property('done')
                expect(event.detail).to.have.property('fullBytesLength')
                expect(event.detail).to.have.property('progress')

                if (event.detail.bytesReceived === 0 || event.detail.fullBytesLength === 0) {
                    expect(event.detail.progress).to.equal(0)
                    expect(event.detail.done).to.false
                }

                if (event.detail.done) {
                    expect(event.detail.progress).to.equal(1)
                    expect(event.detail.bytesReceived).to.equal(event.detail.fullBytesLength)
                    loadingEnd = true

                    window.removeEventListener('flow:loading:progress', onQueryLoadingProgress)
                }
            }

            const onQueryTransitionIn = (event) => {
                expect(transitionOutStart).to.true
                expect(loadingEnd).to.true

                loadingIn = true

                window.removeEventListener('flow:transition:in', onQueryTransitionIn)

                expect(event.from.template).to.equal('home')
                expect(event.from.url.pathname).to.equal('/')
                expect(event.from).to.have.property('view')
                expect(event.from.view.hasAttribute('data-flowtypus-view')).to.true
                expect(event.to.template).to.equal('infos')
                expect(event.to.url.pathname).to.equal('/infos')
                expect(event.to).to.have.property('view')
                expect(event.to.view.hasAttribute('data-flowtypus-view')).to.true
                expect(event.to).to.have.property('document')
                expect(event.to).to.have.property('container')
                expect(event.from.view).to.not.equal(event.to.view)

                expect(event).to.have.property('container')
                expect(event).to.have.property('link')
                expect(event.link.tagName).to.equal('A')
                expect(event).to.have.property('transitionKey')
                expect(event.transitionKey).to.equal('* <=> *')

                expect(window.document.querySelectorAll('[data-flowtypus-view]')).to.have.length(2)
                expect(
                    window.document.querySelectorAll('[data-flowtypus-old-view]')
                ).to.have.length(1)
                expect(
                    window.document.querySelectorAll('[data-flowtypus-new-view]')
                ).to.have.length(1)
            }

            const onQueryTransitionEnd = (event) => {
                expect(loadingIn).to.true

                expect(event.error).to.null

                window.removeEventListener('flow:transition:end', onQueryTransitionEnd)

                expect(event.from.template).to.equal('home')
                expect(event.from.url.pathname).to.equal('/')
                expect(event.from).to.have.property('view')
                expect(event.from.view.hasAttribute('data-flowtypus-view')).to.true
                expect(event.to.template).to.equal('infos')
                expect(event.to.url.pathname).to.equal('/infos')
                expect(event.to).to.have.property('view')
                expect(event.to.view.hasAttribute('data-flowtypus-view')).to.true
                expect(event.to).to.have.property('document')
                expect(event.to).to.have.property('container')
                expect(event.from.view).to.not.equal(event.to.view)

                expect(event).to.have.property('container')
                expect(event).to.have.property('link')
                expect(event.link.tagName).to.equal('A')
                expect(event).to.have.property('transitionKey')
                expect(event.transitionKey).to.equal('* <=> *')

                expect(window.document.querySelectorAll('[data-flowtypus-view]')).to.have.length(1)
            }

            window.addEventListener('flow:transition:out', onQueryTransitionOut)
            window.addEventListener('flow:loading:progress', onQueryLoadingProgress)
            window.addEventListener('flow:transition:in', onQueryTransitionIn)
            window.addEventListener('flow:transition:end', onQueryTransitionEnd)

            cy.get('nav a').last().click()
            // Wait for transitions done
            cy.wait(500)
        })
    })

    it('Check if transition end error when bad link', () => {
        cy.window().then((window) => {
            const onQueryTransitionEnd = (event) => {
                expect(event.error).to.not.null

                window.removeEventListener('flow:transition:end', onQueryTransitionEnd)
            }

            window.addEventListener('flow:transition:end', onQueryTransitionEnd)

            window.Flowtypus.goToPage('/error')
            // Wait for transitions done
            cy.wait(500)
        })
    })

    it('Check if cache work', () => {
        cy.get('nav a').last().click()
        cy.wait(500)
        cy.get('nav a').first().click()
        cy.wait(500)

        cy.window().then((window) => {
            const onQueryLoadingProgress = (event) => {
                expect(event.detail.cache).to.true
                expect(event.detail.done).to.true

                if (event.detail.done) {
                    window.removeEventListener('flow:loading:progress', onQueryLoadingProgress)
                }
            }

            window.addEventListener('flow:loading:progress', onQueryLoadingProgress)

            cy.get('nav a').last().click()
            // Wait for transitions done
            cy.wait(500)

            window.Flowtypus.clearCacheForUrl('/')
        })

        cy.window().then((window) => {
            const onQueryLoadingProgress = (event) => {
                expect(event.detail.cache).to.false

                if (event.detail.done) {
                    window.removeEventListener('flow:loading:progress', onQueryLoadingProgress)
                }
            }

            window.addEventListener('flow:loading:progress', onQueryLoadingProgress)

            cy.get('nav a').first().click()
            // Wait for transitions done
            cy.wait(500)

            window.Flowtypus.clearAllCache()
        })

        cy.window().then((window) => {
            const onQueryLoadingProgress = (event) => {
                expect(event.detail.cache).to.false

                if (event.detail.done) {
                    window.removeEventListener('flow:loading:progress', onQueryLoadingProgress)
                }
            }

            window.addEventListener('flow:loading:progress', onQueryLoadingProgress)

            cy.get('nav a').last().click()
            // Wait for transitions done
            cy.wait(500)
        })
    })

    it('Check if prefetching work with focus', () => {
        cy.get('nav a').last().trigger('focus')

        cy.get('link[as=document]')
            .should('exist')
            .should('have.length', 1)
            .should('have.attr', 'rel', 'prefetch')
            .should('have.attr', 'href', 'http://localhost:8080/infos')
    })

    /**
     * ! I don't know why but need to be the last
     * ! else the test just after will fail with timeout while doing beforeEach
     * ! I've tried many things but nothing that move this test worked
     */
    it('Check if prefetching work', () => {
        cy.get('nav a').last().trigger('mouseenter')

        cy.get('link[as=document]')
            .should('exist')
            .should('have.length', 1)
            .should('have.attr', 'rel', 'prefetch')
            .should('have.attr', 'href', 'http://localhost:8080/infos')

        cy.get('nav a').last().trigger('mouseenter')

        // No duplication
        cy.get('link[as=document]').should('have.length', 1)

        cy.get('nav a').first().trigger('mouseenter')

        cy.get('link[as=document]')
            .should('have.length', 2)
            .last()
            .should('have.attr', 'rel', 'prefetch')
            .should('have.attr', 'href', 'http://localhost:8080/')

        cy.get('nav a').last().click()

        // wait for transition
        cy.wait(500)

        cy.get('nav a').first().trigger('mouseenter')

        // // All links already been prefetch so do not do it again
        cy.get('link[as=document]').should('have.length', 0)
    })
})
