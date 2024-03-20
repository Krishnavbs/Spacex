import LaunchpadPage from '../support/launchpad-list'

describe('Launchpad Page Tests', () => {
  const launchpadPage = new LaunchpadPage();
  


  it('should search for launchpads', () => {
    cy.visit('/launchpad');
    launchpadPage.searchLaunchpad('Your search query');
    // Add assertions or further actions based on the search results
  });

  it('should clear the search bar', () => {
    launchpadPage.clearSearch();
    // Add assertions or further actions based on the cleared search bar state
  });

  it('should retrieve launchpad cards', () => {
    launchpadPage.getLaunchpadCards().should('have.length.gt', 0);
    // Add more assertions based on the retrieved launchpad cards
  });

  it('should navigate to a specific page using paginator', () => {
    launchpadPage.goToPage(2); // Example: navigate to page 2
    // Add assertions or further actions based on the paginator state
  });
});
