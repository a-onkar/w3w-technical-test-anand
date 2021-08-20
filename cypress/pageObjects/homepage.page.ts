class LandingPage {
  private pageTitle = 'what3words /// The simplest way to talk about location';
  private searchBox = '[data-testid="SearchPanel-Input"]';
  private searchBoxHoverText = '[data-testid="ThreeWordAddress-Text"]';
  private addressSearchResultPanel = '[data-testid="SearchPanel-Item"]';
  private searchResultElements = '[data-testid="ThreeWordAddress-Text"]';
  
  // Header Menu button & its options
  private headerMenu = '[data-testid="HeaderMenu-Menu_open"]';
  private languageSelection = '[data-testid="ThreeWordsLanguage"]';
  private headerMenuCloseButton = '[data-testid="HeaderMenu-Menu_close"]';

  //   Handling cookies
  private acceptCookiesButton = '[data-testid="AcceptAll"]';
  private onBoardDailogClose = '[data-testid="OnboardingDialog-Skip"]';
  private promptCloseButton = '[data-testid="OnboardingPrompt-CloseButton"]';

  verifyPageTitle(): void {
    cy.title().should('eq', this.pageTitle);
  }

  getAcceptCookiesButton(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get(this.acceptCookiesButton).should('be.visible');
  }

  getCloseDialogueButton(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get(this.onBoardDailogClose).should('be.visible');
  }

  getClosePromptButton(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get(this.promptCloseButton).should('be.visible');
  }

  removeSearchBoxHoverText(): void {
    cy.get(this.searchBoxHoverText).should('be.visible').click();
  }

  getSearchBox(): Cypress.Chainable<JQuery<HTMLElement>> {
    this.removeSearchBoxHoverText();
    return cy.get(this.searchBox).should('be.visible');
  }

  selectAddressFromSearchResult(address: string): void {
    cy.get(this.addressSearchResultPanel)
      .should('be.visible')
      .find(this.searchResultElements)
      .each(($list, index) => {
        const addrs = $list.text();
        if (addrs === address) {
          cy.get(this.addressSearchResultPanel)
            .find(this.searchResultElements)
            .eq(index)
            .click();
        }
      });
  }

  selectAddressFromSearchPanel(address: string): void {
    cy.get('.SearchPanel-LocationLine1')
      .should('be.visible')
      .contains(address)
      .parents('button')
      .click();
  }

  getHeaderMenuButton(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get(this.headerMenu).should('be.visible');
  }

  getLanguageSelection(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get(this.languageSelection).should('be.visible');
  }

  selectLanguage(name: string): void {
    cy.get(name).should('be.visible').click();
  }

  getHeaderMenuCloseButton(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get(this.headerMenuCloseButton).should('be.visible');
  }

  verifyWarningForWrongSearch(): void {
    cy.get('.SearchPanel-Warning > div > div > div:nth-child(1)').should(
      'have.text',
      'No address found.'
    );
    cy.get('.SearchPanel-Warning > div > div > div:nth-child(2)').should(
      'have.text',
      'Please try searching for the town or nearby place and zoom in to find the what3words address.'
    );
  }
}

export default LandingPage;