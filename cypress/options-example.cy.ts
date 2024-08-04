import { MountConfig } from "cypress/angular";
import { OptionsExampleComponent } from "../src/app/pages/simple-menu-example/options-example/options-example.component";
import { HotkeyOptions } from "angular2-hotkeys";

const config: MountConfig<OptionsExampleComponent> = {
  providers: [
    { provide: HotkeyOptions, useValue: { disableCheatSheet: true }}
  ]
}

describe('options-example.component.ts', () => {
  beforeEach(() => {
    cy.mount(OptionsExampleComponent, config);
  });

  it('mounts', () => {
    cy.get('[data-cy=counter').should('have.text', 0);
  });

  it('should increase counter with context menu', () => {
    cy.get('[data-cy=counter').should('have.text', 0);
    cy.get('[data-cy="context"]').rightclick();
    cy.contains('Increase').click();
    cy.get('[data-cy=counter]').should('have.text', 1);
  });

  it('should decrease counter with context menu', () => {
    cy.get('[data-cy=counter').should('have.text', 0);
    cy.get('[data-cy="context"]').rightclick();
    cy.contains('Decrease').click();
    cy.get('[data-cy=counter]').should('have.text', -1);
  });

  it('should increase counter with hotkey', () => {
    cy.get('[data-cy=counter').should('have.text', 0);
    cy.get('body').type('{+}');
    cy.get('[data-cy=counter]').should('have.text', 1);
  });

  it('should decrease counter with hotkey', () => {
    cy.get('[data-cy=counter').should('have.text', 0);
    cy.get('body').type('{-}');
    cy.get('[data-cy=counter]').should('have.text', -1);
  });
})