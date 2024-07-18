import { Component } from '@angular/core';
import { ContexrModule, MenuItem } from '../../../../../projects/contexr/src/public-api';
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
  imports: [ContexrModule, ChildComponent],
})
export class ParentComponent {
  menu: MenuItem[] = [
    {
      label: "Alert parent",
      action: () => { alert("Clicked on context menu item 'Alert parent'!"); }
    },
    {
      label: "Submenu",
      items: [
        {
          label: "Console message parent",
          action: () => { console.log("Clicked on context menu item 'Console message parent'!"); }
        }
      ]
    }
  ]
}
