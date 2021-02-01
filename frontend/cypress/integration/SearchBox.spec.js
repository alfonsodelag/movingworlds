/// <reference types="cypress" />

describe('<SearchBox />', () => {

    it('SearchBox /> - Verifying SearchBox component', () => {
        cy.visit('http://localhost:3000');

        cy.get('[data-cy=title]')
            .invoke('text')
            .should('equal', 'Post a URL')

        cy.get('[data-cy=url-form]')
            .should('exist')

        cy.get('[data-cy=fullUrl]')
            .should('exist')
            .should('have.class', 'form-control')

        cy.get('[data-cy=stats]')
            .should('exist')
            .should('have.prop', 'tagName')
            .should('eq', 'A')

        cy.get('[data-cy=fullUrl').type('https://www.google.com')

        cy.get('[data-cy=shorten').click()

    });
});