import { Component } from '@angular/core';
import { MenuItem, ContextDirective } from 'contexr';

@Component({
  selector: 'app-child',
  standalone: true,
  template: `
    <div class="example nested-example" [ctx]="menu">
      But right-clicking on the nested component will give you more options!
    </div>
  `,
  imports: [ContextDirective]
})
export class ChildComponent {
  menu: MenuItem[] = [
    {
      label: "Alert nested",
      order: 100,
      action: () => { alert("Clicked on context menu item 'Alert nested'!"); },
      icon: "notifications_active"
    },
    {
      label: "Submenu",
      order: 1000,
      items: [
        {
          label: "Console message nested",
          order: 100,
          action: () => { console.log("Clicked on context menu item 'Console message nested'!"); }
        }
      ]
    },
    {
      label: "Second submenu",
      order: 2000,
      items: [
        {
          label: "Some action",
          action: () => { console.log("Clicked on some action in second submenu"); }
        }
      ]
    }
  ]
}
