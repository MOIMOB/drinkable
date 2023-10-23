describe('Cocktails', () => {
    beforeEach(() => {
        window.localStorage.setItem('CapacitorStorage.messuarement-system', 'Imperial');
    });

    describe('Create', () => {
        it('Should be included in list', () => {
            cy.visit('#/cocktails');

            cy.dataCy('cocktails-wrapper').should('not.contain', 'Test Cocktail');

            cy.dataCy('create-cocktail').click();

            cy.dataCy('save-cocktail').click();

            cy.dataCy('cocktail-name').should('have.class', 'input-error').type('Test Cocktail');
            cy.dataCy('cocktail-name').blur();

            cy.dataCy('cocktail-image').selectFile('static/images/balmoral.jpg', { force: true });

            cy.dataCy('textarea').type('Test Instructions');

            cy.dataCy('ingredients-number').should('not.exist');

            cy.dataCy('save-cocktail').click();

            cy.dataCy('ingredients-number').should('contain', '0');
            cy.dataCy('cocktail-abv').should('contain', '0%');
            cy.dataCy('cocktail-dialog').should('contain', 'Test Cocktail').should('contain', 'Test Instructions');

            cy.dataCy('close-dialog').click();

            cy.dataCy('cocktails-wrapper').should('contain', 'Test Cocktail');
        });
    });

    describe('Search', () => {
        it('Should display only result from search', () => {
            cy.visit('#/cocktails');

            cy.dataCy('all-cocktails-filter').find('input').type('Gin & Tonic');
            cy.dataCy('cocktails-wrapper').children().should('have.length', '1');
        });
    });

    describe('Filter', () => {
        it('Category - Should display only result from filter', () => {
            cy.visit('#/cocktails');

            cy.dataCy('cocktails-wrapper')
                .children()
                .then(el => {
                    cy.get('[data-cy=all-cocktails-filter] [data-cy=open-filters]').click();
                    cy.dataCy('select-category').select('Shot');
                    cy.dataCy('filter-dialog-close').click();
                    cy.dataCy('active-filters').should('contain', '1');
                    cy.dataCy('cocktails-wrapper').children().should('have.length.lessThan', el.length);
                });
        });
    });

    describe('Rate', () => {
        it('Should display rating', () => {
            cy.visit('#/cocktails');

            cy.dataCy('cocktail-item-rating').should('not.exist');

            cy.dataCy('cocktails-wrapper').children().first().click();

            cy.dataCy('rating-input-3').click();

            cy.dataCy('close-dialog').click();

            cy.dataCy('cocktail-item-rating')
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

            cy.dataCy('create-cocktail').click();

            cy.dataCy('cocktail-name').type('Test Cocktail');
            cy.dataCy('cocktail-name').blur();
            cy.dataCy('cocktail-image').selectFile('static/images/balmoral.jpg', { force: true });
            cy.dataCy('textarea').type('Test Instructions');
            cy.dataCy('save-cocktail').click();
            cy.dataCy('rating-input-4').click();

            cy.dataCy('close-dialog').click();

            cy.dataCy('cocktail-item-rating')
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

    describe('Add Notes', () => {
        it('Should display notes', () => {
            cy.visit('#/cocktails');
            cy.dataCy('cocktails-wrapper').children().first().click();
            cy.dataCy('notes-container').should('not.exist');

            cy.dataCy('add-notes').click();

            cy.dataCy('notes-textarea').type('This is some notes for this cocktail!');
            cy.dataCy('save-notes').click();

            cy.dataCy('notes-container').should('contain', 'This is some notes for this cocktail!');
        });

        it('Notes should not be shown when creating a new cocktail', () => {
            cy.visit('#/cocktails');
            cy.dataCy('create-cocktail').click();
            cy.dataCy('add-notes').should('not.exist');
        });
    });

    describe('From Ingredients', () => {
        it('Empty list - Should display text', () => {
            cy.visit('#/cocktails');
            cy.dataCy('nav-1').click();
            cy.dataCy('from-ingredients-empty-list').should(
                'contain',
                'No Cocktails found. Try adding more ingredients'
            );
        });
    });
});
