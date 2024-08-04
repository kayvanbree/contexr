import { Component } from '@angular/core';
import { ContextDirective, MenuItem } from 'contexr';

@Component({
  selector: 'app-options-example',
  standalone: true,
  template: `
  <div data-cy="context" [ctx]="menu">
    Use the context menu to increase the count.
    <br />
    Count: <span data-cy="counter">{{count}}</span>
  </div>
  `,
  imports: [ContextDirective]
})
export class OptionsExampleComponent {
  count: number = 0;

  menu: MenuItem[] = [
    {
      label: "Increase",
      action: () => { this.count++; },
      hotkey: 'plus',
      icon: "add"
    },
    {
      label: "Decrease",
      action: () => { this.count-- },
      hotkey: '-',
      icon: "remove"
    }
  ]
}
