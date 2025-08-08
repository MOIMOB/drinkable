describe('Navbar Dynamic Title', () => {
    beforeEach(() => {
        // Set up initial localStorage state
        window.localStorage.setItem('CapacitorStorage.messuarement-system', 'Imperial');
        // Reset to default DrinkTypeFilter (Both = 0)
        window.localStorage.setItem('CapacitorStorage.settings', JSON.stringify({
            drinkTypeFilter: 0 // DrinkTypeFilter.Both
        }));
    });

    it('Should show "Cocktails" when DrinkTypeFilter is Both', () => {
        cy.visit('#/cocktails');
        
        // Check that the cocktails navigation label shows "Cocktails"
        cy.dataCy('nav-label-cocktails')
            .should('contain', 'Cocktails');
    });

    it('Should show "Cocktails" when DrinkTypeFilter is OnlyCocktails', () => {
        // Set DrinkTypeFilter to OnlyCocktails (1)
        window.localStorage.setItem('CapacitorStorage.settings', JSON.stringify({
            drinkTypeFilter: 1
        }));
        
        cy.visit('#/cocktails');
        
        // Check that the cocktails navigation label shows "Cocktails"
        cy.dataCy('nav-label-cocktails')
            .should('contain', 'Cocktails');
    });

    it('Should show "Mocktails" when DrinkTypeFilter is OnlyMocktails', () => {
        // Set DrinkTypeFilter to OnlyMocktails (2)
        window.localStorage.setItem('CapacitorStorage.settings', JSON.stringify({
            drinkTypeFilter: 2
        }));
        
        cy.visit('#/cocktails');
        
        // Check that the cocktails navigation label shows "Mocktails"
        cy.dataCy('nav-label-cocktails')
            .should('contain', 'Mocktails');
    });

    it('Should update navigation title in real-time when changing DrinkTypeFilter setting', () => {
        cy.visit('#/user');
        
        // Go to settings page
        cy.dataCy('menu-settings').click();
        
        // Initially should show "Cocktails" (default is Both = 0, which shows "Cocktails")
        cy.dataCy('nav-label-cocktails')
            .should('contain', 'Cocktails');
        
        // Change DrinkTypeFilter to OnlyMocktails
        cy.dataCy('select-drink-type-filter')
            .select('Only Mocktails', {force: true});
        
        // Navigation should now show "Mocktails" without page refresh
        cy.dataCy('nav-label-cocktails')
            .should('contain', 'Mocktails');
        
        // Change back to OnlyCocktails
        cy.dataCy('select-drink-type-filter')
            .select('Only Cocktails', {force: true});
        
        // Navigation should now show "Cocktails" again
        cy.dataCy('nav-label-cocktails')
            .should('contain', 'Cocktails');
        
        // Change to Both
        cy.dataCy('select-drink-type-filter')
            .select('Both Cocktails & Mocktails', {force: true});
        
        // Navigation should still show "Cocktails" (Both shows "Cocktails")
        cy.dataCy('nav-label-cocktails')
            .should('contain', 'Cocktails');
    });

    it('Should maintain correct navigation title when navigating between pages', () => {
        // Set DrinkTypeFilter to OnlyMocktails (2)
        window.localStorage.setItem('CapacitorStorage.settings', JSON.stringify({
            drinkTypeFilter: 2
        }));
        
        cy.visit('#/home-router');
        
        // Check mocktails label from home page
        cy.dataCy('nav-label-cocktails')
            .should('contain', 'Mocktails');
        
        // Navigate to ingredients page
        cy.dataCy('nav-label-ingredients').click();
        
        // Should still show mocktails
        cy.dataCy('nav-label-cocktails')
            .should('contain', 'Mocktails');
        
        // Navigate to user page
        cy.dataCy('nav-label-user').click();
        
        // Should still show mocktails
        cy.dataCy('nav-label-cocktails')
            .should('contain', 'Mocktails');
    });

    it('Should show "Mocktails" in page title when DrinkTypeFilter is OnlyMocktails', () => {
        // Set DrinkTypeFilter to OnlyMocktails (2)
        window.localStorage.setItem('CapacitorStorage.settings', JSON.stringify({
            drinkTypeFilter: 2
        }));
        
        cy.visit('#/cocktails');
        
        // Check that the page title shows "Mocktails"
        cy.dataCy('cocktails-page-title')
            .should('contain', 'Mocktails');
        
        // Check that the tab titles show mocktail versions
        cy.dataCy('cocktails-tab-title-0')
            .should('contain', 'All Mocktails');
    });

    it('Should show "Cocktails" in page title when DrinkTypeFilter is OnlyCocktails', () => {
        // Set DrinkTypeFilter to OnlyCocktails (1)
        window.localStorage.setItem('CapacitorStorage.settings', JSON.stringify({
            drinkTypeFilter: 1
        }));
        
        cy.visit('#/cocktails');
        
        // Check that the page title shows "Cocktails"
        cy.dataCy('cocktails-page-title')
            .should('contain', 'Cocktails');
        
        // Check that the tab titles show cocktail versions
        cy.dataCy('cocktails-tab-title-0')
            .should('contain', 'All Cocktails');
    });

    it('Should update page title and tabs in real-time when changing DrinkTypeFilter setting', () => {
        cy.visit('#/cocktails');
        
        // Initially should show "Cocktails" (default is Both = 0)
        cy.dataCy('cocktails-page-title')
            .should('contain', 'Cocktails');
        cy.dataCy('cocktails-tab-title-0')
            .should('contain', 'All Cocktails');
        
        // Go to settings
        cy.dataCy('nav-label-user').click();
        cy.dataCy('menu-settings').click();
        
        // Change DrinkTypeFilter to OnlyMocktails
        cy.dataCy('select-drink-type-filter')
            .select('Only Mocktails', {force: true});
        
        // Go back to cocktails page
        cy.dataCy('nav-label-cocktails').click();
        
        // Page title and tabs should now show mocktail versions
        cy.dataCy('cocktails-page-title')
            .should('contain', 'Mocktails');
        cy.dataCy('cocktails-tab-title-0')
            .should('contain', 'All Mocktails');
        
        // Go back to settings and change to OnlyCocktails
        cy.dataCy('nav-label-user').click();
        cy.dataCy('menu-settings').click();
        cy.dataCy('select-drink-type-filter')
            .select('Only Cocktails', {force: true});
        
        // Go back to cocktails page
        cy.dataCy('nav-label-cocktails').click();
        
        // Page title and tabs should now show cocktail versions
        cy.dataCy('cocktails-page-title')
            .should('contain', 'Cocktails');
        cy.dataCy('cocktails-tab-title-0')
            .should('contain', 'All Cocktails');
    });

    it('Should show "No Mocktails found" message when DrinkTypeFilter is OnlyMocktails', () => {
        // Set DrinkTypeFilter to OnlyMocktails (2) and clear ingredients to force empty state
        window.localStorage.setItem('CapacitorStorage.settings', JSON.stringify({
            drinkTypeFilter: 2
        }));
        window.localStorage.setItem('CapacitorStorage.ingredients', JSON.stringify([]));
        
        cy.visit('#/cocktails?activeNavigationIndex=1');
        
        // Check that the empty message shows "No Mocktails found"
        cy.dataCy('from-ingredients-empty-list')
            .should('contain', 'No Mocktails found');
    });

    it('Should show "No Cocktails found" message when DrinkTypeFilter is OnlyCocktails', () => {
        // Set DrinkTypeFilter to OnlyCocktails (1) and clear ingredients to force empty state
        window.localStorage.setItem('CapacitorStorage.settings', JSON.stringify({
            drinkTypeFilter: 1
        }));
        window.localStorage.setItem('CapacitorStorage.ingredients', JSON.stringify([]));
        
        cy.visit('#/cocktails?activeNavigationIndex=1');
        
        // Check that the empty message shows "No Cocktails found"
        cy.dataCy('from-ingredients-empty-list')
            .should('contain', 'No Cocktails found');
    });

    it('Should update ingredients widget text when DrinkTypeFilter changes', () => {
        // Set initial state - Both Cocktails & Mocktails
        window.localStorage.setItem('CapacitorStorage.settings', JSON.stringify({
            drinkTypeFilter: 0
        }));
        
        cy.visit('#/home-router');
        
        // Initially should show "Cocktails"
        cy.dataCy('ingredients-widget-title')
            .should('contain', 'Cocktails');
        
        // Go to settings and change to OnlyMocktails
        cy.dataCy('nav-label-user').click({force: true});
        cy.dataCy('menu-settings').click({force: true});
        cy.dataCy('select-drink-type-filter')
            .select('Only Mocktails', {force: true});
        
        // Go back to home page
        cy.dataCy('nav-label-home-router').click({force: true});
        
        // Widget title should now show "Mocktails"
        cy.dataCy('ingredients-widget-title')
            .should('contain', 'Mocktails');
    });
});