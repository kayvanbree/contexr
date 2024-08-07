import { Component } from '@angular/core';
import { MenuItem, ContextDirective, Divider } from 'contexr';
import { ChildComponent } from '../child/child.component';

@Component({
  selector: 'app-parent',
  standalone: true,
  template: `
    <div data-cy="context" class="example" [ctx]="menu">
      This component has another component within it. Right-clicking on this div will give you only the options of the parent component.
      <app-child></app-child>
    </div>
    `,
  imports: [
    ContextDirective,
    ChildComponent
  ],
})
export class ParentComponent {
  menu: MenuItem[] = [
    {
      label: "Alert parent",
      order: -100,
      action: () => { alert("Clicked on context menu item 'Alert parent'!"); },
      icon: "notifications_active"
    },
    {
      divider: true,
      order: 999
    },
    {
      label: "Submenu",
      order: 1000,
      items: [
        {
          label: "Console message parent",
          order: -100,
          action: () => { console.log("Clicked on context menu item 'Console message parent'!"); }
        }
      ]
    }
  ]
}
