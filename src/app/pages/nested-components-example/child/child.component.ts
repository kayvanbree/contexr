import { Component } from '@angular/core';
import { ContexrModule, MenuItem } from '../../../../../projects/contexr/src/public-api';

@Component({
  selector: 'app-child',
  standalone: true,
  template: `
    <div class="example nested-example" style="background-color: tomato;" [ctx]="menu">
      But right-clicking on the nested component will give you more options!
    </div>
  `,
  imports: [ContexrModule]
})
export class ChildComponent {
  menu: MenuItem[] = [
    {
      label: "Alert nested",
      action: () => { alert("Clicked on context menu item 'Alert nested'!"); }
    },
    {
      label: "Submenu",
      items: [
        {
          label: "Console message nested",
          action: () => { console.log("Clicked on context menu item 'Console message nested'!"); }
        }
      ]
    }
  ]
}
