import { Component } from '@angular/core';
import { MenuItem, ContextDirective } from 'contexr';
import { ChildComponent } from '../child/child.component';

@Component({
  selector: 'app-parent',
  standalone: true,
  template: `
    <div class="example" [ctx]="menu">
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
      priority: -100,
      action: () => { alert("Clicked on context menu item 'Alert parent'!"); },
      icon: "notifications_active"
    },
    { 
      label: 'separator',
      priority: 999
    },
    {
      label: "Submenu",
      priority: 1000,
      items: [
        {
          label: "Console message parent",
          priority: -100,
          action: () => { console.log("Clicked on context menu item 'Console message parent'!"); }
        }
      ]
    }
  ]
}
