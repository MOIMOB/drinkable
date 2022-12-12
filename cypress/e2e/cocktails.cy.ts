describe('Cocktails', () => {
    beforeEach(() => {
        window.localStorage.setItem('CapacitorStorage.messuarement-system', 'Imperial');
    });

    describe('Create', () => {
        it('Should be included in list', () => {
            cy.visit('#/cocktails');

            cy.getByDataAttribute('cocktails-wrapper').should('not.contain', 'Test Cocktail');

            cy.getByDataAttribute('create-cocktail').click();

            cy.getByDataAttribute('save-cocktail').click();

            cy.getByDataAttribute('cocktail-name').should('have.class', 'input-error').type('Test Cocktail').blur();

            cy.getByDataAttribute('cocktail-image').selectFile('static/images/balmoral.jpg', { force: true });

            cy.getByDataAttribute('textarea').type('Test Instructions');

            cy.getByDataAttribute('ingredients-number').should('contain', '1');

            cy.getByDataAttribute('save-cocktail').click();

            cy.getByDataAttribute('ingredients-number').should('contain', '0');
            cy.getByDataAttribute('cocktail-dialog')
                .should('contain', 'Test Cocktail')
                .should('contain', 'Test Instructions')
                .should('contain', 'Submit for review');

            cy.getByDataAttribute('close-dialog').click();

            cy.getByDataAttribute('cocktails-wrapper').should('contain', 'Test Cocktail');
        });
    });

    describe('Search', () => {
        it('Should display only result from search', () => {
            cy.visit('#/cocktails');

            cy.getByDataAttribute('cocktails-search').type('Gin & Tonic');
            cy.getByDataAttribute('cocktails-wrapper').children().should('have.length', '1');
        });
    });

    describe('Filter', () => {
        it('Category - Should display only result from filter', () => {
            cy.visit('#/cocktails');

            cy.getByDataAttribute('open-filters').click();
            cy.getByDataAttribute('select-category').select('Shot');
            cy.getByDataAttribute('filter-dialog-close').click();
            cy.getByDataAttribute('active-filters').should('contain', '1');
            cy.getByDataAttribute('cocktails-wrapper').children().should('have.length', '5'); //Todo remove magic number
        });
    });

    describe('Rate', () => {
        it('Should display rating', () => {
            cy.visit('#/cocktails');

            cy.getByDataAttribute('cocktail-item-rating').should('not.exist');

            cy.getByDataAttribute('cocktails-wrapper').children().first().click();

            cy.getByDataAttribute('rating-input-3').click();

            cy.getByDataAttribute('close-dialog').click();

            cy.getByDataAttribute('cocktail-item-rating')
                .should('exist')
                .children()
                .each((el, index) => {
                    if (index < 3) {
                        expect(el).to.not.have.class('bg-opacity-20');
                    } else {
                        expect(el).to.have.class('bg-opacity-20');
                    }
                });
        });

        it('Custom made - Should display rating', () => {
            cy.visit('#/cocktails');

            cy.getByDataAttribute('create-cocktail').click();

            cy.getByDataAttribute('cocktail-name').type('Test Cocktail').blur();
            cy.getByDataAttribute('cocktail-image').selectFile('static/images/balmoral.jpg', { force: true });
            cy.getByDataAttribute('textarea').type('Test Instructions');
            cy.getByDataAttribute('save-cocktail').click();
            cy.getByDataAttribute('rating-input-4').click();

            cy.getByDataAttribute('close-dialog').click();

            cy.getByDataAttribute('cocktail-item-rating')
                .should('exist')
                .children()
                .each((el, index) => {
                    if (index < 4) {
                        expect(el).to.not.have.class('bg-opacity-20');
                    } else {
                        expect(el).to.have.class('bg-opacity-20');
                    }
                });
        });
    });

    describe('From Ingredients', () => {
        it('Empty list - Should display text', () => {
            cy.visit('#/cocktails');
            cy.getByDataAttribute('nav-1').click();
            cy.getByDataAttribute('from-ingredients-empty-list').should(
                'contain',
                'No Cocktails found. Try adding more ingredients'
            );
        });
    });
});
