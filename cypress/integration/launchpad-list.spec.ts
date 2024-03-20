// cypress/integration/launchpad-list.spec.js

describe('LaunchpadListComponent', () => {
    beforeEach(() => {
      cy.visit('/launchpad'); // Assuming '/launchpad' is the route for LaunchpadListComponent
    });
  
    it('should display search bar and launchpad cards', () => {
      // Assert that the search bar exists
      cy.get('.search-bar').should('exist');
  
      // Assert that launchpad cards are displayed
      cy.get('.launchpad-card').should('exist');
    });
  
    it('should search for launchpads', () => {
      // Type a search query into the search input
      cy.get('.search-bar input[type="text"]').type('Launchpad 1');
  
      // Click the clear button
      cy.get('.search-bar button.clear').click();
  
      // Assert that the search input is cleared
      cy.get('.search-bar input[type="text"]').should('have.value', '');
  
      // Type another search query into the search input
      cy.get('.search-bar input[type="text"]').type('Launchpad 2');
  
      // Press Enter to perform the search
      cy.get('.search-bar input[type="text"]').type('{enter}');
  
      // Assert that the launchpad cards are filtered based on the search query
      cy.get('.launchpad-card').should('have.length', 1); // Assuming only one launchpad matches the search query
    });
  });
  