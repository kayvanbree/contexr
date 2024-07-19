import { Component } from '@angular/core';
import { ContexrModule, MenuItem } from '../../../../../projects/contexr/src/public-api';

@Component({
  selector: 'app-hotkeys-example',
  standalone: true,
  template: `
    <div class="example" [ctx]="menu">
      Right-click this div to see what hotkeys you can use.
      <br /><br />
      Then try to use those hotkeys!
  </div>
  `,
  imports: [ContexrModule],
})
export class HotkeysExampleComponent {
  menu: MenuItem[] = [
    {
      label: "Alert",
      hotkey: 'a',
      action: () => { alert("Clicked on context menu item 'Alert'!"); }
    },
    {
      label: "Console message",
      hotkey: 'shift+a',
      action: () => { console.log("Clicked on context menu item 'Console message'!"); }
    }
  ]
}
