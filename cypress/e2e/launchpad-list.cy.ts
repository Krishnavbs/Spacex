describe('SpaceX Launchpad Explorer', () => {
  beforeEach(() => {
    cy.visit('localhost:4200/launchpad')
  })
  it('should display the homepage', () => {
    cy.get('h1').should('contain', 'SpaceX Launchpad Explorer');
    cy.get('footer p').should('contain', '2024 SpaceX Launchpad Explorer');
  });

  it('should navigate to launchpad module', () => {
    cy.url().should('include', '/launchpad');
    cy.get('button').should('contain', 'View Launches');
  });
  it('should type in the search box and filter launchpads', () => {
    cy.get('.search-bar input').type('california');
    cy.wait(400);
    cy.get('.launchpad-card-wrapper').should('have.length', 1);
  });

  it('should clear the search box', () => {
    cy.get('.search-bar input').type('Launchpad 1');
    cy.get('.clear').click();
    cy.get('.search-bar input').should('have.value', '');
  });

  it('should hover over a random card and click on it', () => {
    cy.get('.view-launches-btn').then(cards => {
      const randomIndex = Math.floor(Math.random() * cards.length);
      const randomButtom = cards[randomIndex];
      cy.wrap(randomButtom).click({force:true})
    });
    cy.get('.launchpad-card').first().trigger('mouseover')
    cy.get('.launchpad-card').first().click({force:true})
    cy.get('.launchpad-card').first().click({force:true})
    cy.get('.launchpad-card').first().click({force:true})
    cy.get('.launchpad-card').first().trigger("click");

    cy.get('.launchpad-card').first().should('be.visible').then((el) => {
      console.log(el)
      cy.get('.launchpad-card').first().click({force:true}); // Click after element is visible
    });
    cy.get('.launchpad-card .view-launches-btn').first().click({force:true})
    cy.wait(400);
    cy.url().should('include', '/launches');
  });
});
