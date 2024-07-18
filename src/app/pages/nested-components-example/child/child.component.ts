import { Component } from '@angular/core';
import { ContexrModule, MenuItem } from '../../../../../projects/contexr/src/public-api';

@Component({
  selector: 'app-child',
  standalone: true,
  template: `
    <div class="example nested-example" [ctx]="menu">
      But right-clicking on the nested component will give you more options!
    </div>
  `,
  imports: [ContexrModule]
})
export class ChildComponent {
  menu: MenuItem[] = [
    {
      label: "Alert nested",
      priority: 100,
      action: () => { alert("Clicked on context menu item 'Alert nested'!"); }
    },
    {
      label: "Submenu",
      priority: 1000,
      items: [
        {
          label: "Console message nested",
          priority: 100,
          action: () => { console.log("Clicked on context menu item 'Console message nested'!"); }
        }
      ]
    }
  ]
}
