import { Component } from '@angular/core';
import { ContexrModule, MenuItem } from '../../../../projects/contexr/src/public-api';
import { NestedComponentComponent } from '../../components/nested-component/nested-component.component';

@Component({
  selector: 'app-nested-components-example',
  standalone: true,
  templateUrl: './nested-components-example.component.html',
  styleUrl: './nested-components-example.component.css',
  imports: [ContexrModule, NestedComponentComponent],
})
export class NestedComponentsExampleComponent {
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
