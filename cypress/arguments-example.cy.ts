import { MountConfig } from "cypress/angular";
import { ArgumentsExampleComponent } from "../src/app/pages/arguments-example-page/arguments-example/arguments-example.component";
import { HotkeyOptions } from "angular2-hotkeys";

const config: MountConfig<ArgumentsExampleComponent> = {
    providers: [
        { provide: HotkeyOptions, useValue: { disableCheatSheet: true }}
    ]
}

describe('arguments-example.component.ts', () => {
    beforeEach(() => {
      cy.mount(ArgumentsExampleComponent, config);
    });

    it('should mount', () => {
        cy.get('[data-cy=input]').should('exist');
    });

    it('should call alert with correct argument', () => {
        cy.window().then((win) => {
            cy.stub(win, 'alert').as('alert');
        });

        cy.get('[data-cy=input]').type('asdf');
        cy.get('[data-cy=context]').rightclick();
        cy.contains('Announce name').click();

        cy.get('@alert').should('be.calledWith', "Name is asdf");
    });
});