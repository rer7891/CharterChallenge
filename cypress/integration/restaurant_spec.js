/* eslint-disable no-undef */
/// <reference types="cypress" />
// @ts-check
describe('Cypress', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

    it('has six rows of restaurants per page', () => {
        cy.get('tr')
        .should('have.length', 6
        )
    })

    it('has five tds of restaurants informations * five rows', () => {
      cy.get('td')
      .should('have.length', 25)
     })

    it('can filter by state', () => {
        cy.get('input').eq(0)
        .type('CO')
        .should('have.value', 'CO')

        cy.get('tr')
        .should('have.length', 2
        )

        cy.get('table').contains('td', 'Matsuhisa');

      })

      it('can filter by genre', () => {
        cy.get('input').eq(1)
        .type('Asian')
        .should('have.value', 'Asian')

        cy.get('tr')
        .should('have.length', 4
        )

        cy.get('table').contains('td', "A Chef's Kitchen");
        cy.get('table').contains('td', "Matsuhisa");
        cy.get('table').contains('td', "Uchi");
      })

       it('can filter restaurant information with search bar' , () => {
        cy.get('input').eq(2)
        .type('Artisanal Restaurant')
        cy.get('button')
        .click()
 
        cy.get('td')
        .should('have.length', 5)

        cy.get('table').contains('td', "Artisanal Restaurant");
       })

  })