import { Component } from '@angular/core';
import { MenuItem } from '../../../../projects/contexr/src/lib/types/menu-item';
import { ContexrModule } from '../../../../projects/contexr/src/public-api';

@Component({
  standalone: true,
  templateUrl: './options-example.component.html',
  styleUrl: './options-example.component.css',
  imports: [ContexrModule]
})
export class SimpleMenuExampleComponent {
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

  codeComponent = `
@Component({
    selector: 'app-simple-menu-example',
    standalone: true,
    templateUrl: './simple-menu-example.component.html',
    styleUrl: './simple-menu-example.component.css',
    imports: [ContexrModule]
})
export class SimpleMenuExampleComponent {
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
  `;
    codeTemplate = `
<div class="example" [ctx]="menu">
    Right-click this div to open a context menu!
</div>
    `;
}
