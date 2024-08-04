import { MountConfig } from "cypress/angular";
import { HotkeyOptions } from "angular2-hotkeys";
import { ParentComponent } from "../src/app/pages/nested-components-example/parent/parent.component";

const config: MountConfig<ParentComponent> = {
    providers: [
        { provide: HotkeyOptions, useValue: { disableCheatSheet: true }}
    ]
}
  
describe('nested-components-example.component.ts', () => {
    beforeEach(() => {
      cy.mount(ParentComponent, config);
    });

    it('should mount', () => {
        cy.contains('This component').should('exist');
        cy.contains('But right-clicking').should('exist');
    });

    it('should have correct menus', () => {
        cy.get('[data-cy="context"]').rightclick();
        cy.contains('Alert parent').should('exist');
        cy.contains('Alert nested').should('exist');
        cy.contains('Submenu').should('exist');
        cy.contains('Second submenu').should('exist');

        cy.contains('Submenu').trigger('mouseenter');
        cy.contains('Console message parent').should('exist');
        cy.contains('Console message nested').should('exist');

        cy.contains('Second submenu').trigger('mouseenter');
        cy.contains('Some action').should('exist');
    });

    it('should trigger console messages', () => {
        cy.window().then((win) => {
            cy.stub(win.console, 'log').as('consoleLog');
        });

        cy.get('[data-cy="context"]').rightclick();
        cy.contains('Submenu').trigger('mouseenter');
        cy.contains('Console message parent').click();

        cy.get('@consoleLog').should('be.calledWith', "Clicked on context menu item 'Console message parent'!");
    });

    it('should trigger alert messages', () => {
        cy.window().then((win) => {
            cy.stub(win, 'alert').as('alert');
        });

        cy.get('[data-cy="context"]').rightclick();
        cy.contains('Alert parent').click();

        cy.get('@alert').should('be.calledWith', "Clicked on context menu item 'Alert parent'!");
    });
});