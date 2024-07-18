import { Component } from '@angular/core';
import { ContexrModule, MenuItem } from '../../../../projects/contexr/src/public-api';

@Component({
  selector: 'app-nested-component',
  standalone: true,
  templateUrl: './nested-component.component.html',
  styleUrl: './nested-component.component.css',
  imports: [ContexrModule]
})
export class NestedComponentComponent {
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
