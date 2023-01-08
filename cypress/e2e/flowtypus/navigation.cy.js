/// <reference types="cypress" />

describe('Check if navigation works', () => {
    beforeEach(() => {
        // Cypress starts out with a blank slate for each test
        // so we must tell it to visit our website with the `cy.visit()` command.
        // Since we want to visit the same URL at the start of all our tests,
        // we include it in our beforeEach function so that it runs before each test
        cy.visit('/')
    })

    it('Should countain the Home page', () => {
        // If home page
        cy.get('h1').should('have.text', 'Flowtypus')

        // If link in nav with attributes
        cy.get('nav a').first().should('have.attr', 'href', './')
        cy.get('nav a').first().should('have.attr', 'data-flowtypus-target-template', 'home')
        cy.get('nav a').last().should('have.attr', 'href', './infos')
        cy.get('nav a').last().should('have.attr', 'data-flowtypus-target-template', 'infos')

        // If code to reload work
        cy.get('.modales').should('exist')
        cy.get('.modales').children().should('have.length', 1)

        // Flowtypus must be defined
        cy.window().then((window) => {
            expect(window).to.have.any.keys('Flowtypus')
            expect(window.Flowtypus).to.have.any.keys('back')
            expect(window.Flowtypus).to.have.any.keys('forward')
            expect(window.Flowtypus).to.have.any.keys('goToPage')
            expect(window.Flowtypus).to.have.any.keys('setTransition')
            expect(window.Flowtypus).to.have.any.keys('rerunScript')
            expect(window.Flowtypus).to.have.any.keys('rerunScripts')
            expect(window.Flowtypus).to.have.any.keys('clearAllCache')
            expect(window.Flowtypus).to.have.any.keys('clearCacheForUrl')
        })
    })

    it('Should navigate to pages', () => {
        cy.get('nav a').last().click()

        // wait for transition
        cy.wait(500)

        // Check if title update
        cy.get('h1').should('have.text', 'Infos')

        // Check if on page infos
        cy.get('[data-flowtypus-view]').should('have.attr', 'data-flowtypus-view', 'infos')
        cy.url().should('include', '/infos')

        // Check if go back top page home
        cy.go('back')

        // wait for transition
        cy.wait(500)

        cy.get('[data-flowtypus-view]').should('have.attr', 'data-flowtypus-view', 'home')
        cy.url().should('not.include', '/infos')
    })

    it('Method back/forward/goToPage on Flotypus should go back', () => {
        cy.get('nav a').last().click()

        // wait for transition
        cy.wait(500)

        cy.window().then((window) => {
            window.Flowtypus.back()

            // wait for transition
            cy.wait(500)

            cy.get('h1').should('have.text', 'Flowtypus')
        })

        cy.window().then((window) => {
            window.Flowtypus.forward()

            // wait for transition
            cy.wait(500)

            cy.get('h1').should('have.text', 'Infos')
        })

        cy.window().then((window) => {
            window.Flowtypus.goToPage('/')

            // wait for transition
            cy.wait(500)

            cy.get('h1').should('have.text', 'Flowtypus')
        })
    })
})
