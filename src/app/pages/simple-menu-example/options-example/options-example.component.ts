import { Component } from '@angular/core';
import { ContexrModule, MenuItem } from '../../../../../projects/contexr/src/public-api';

@Component({
  selector: 'app-options-example',
  standalone: true,
  template: `
  <div class="example" [ctx]="menu">
    Right-click this div to open a context menu!
  </div>
  `,
  imports: [ContexrModule]
})
export class OptionsExampleComponent {
  menu: MenuItem[] = [
    {
      label: "Alert",
      action: () => { alert("Clicked on context menu item 'Alert'!"); }
    },
    {
      label: "Console message",
      action: () => { console.log("Clicked on context menu item 'Console message'!"); }
    }
  ]
}
