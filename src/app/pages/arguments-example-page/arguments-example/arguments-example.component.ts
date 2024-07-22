import { Component } from '@angular/core';
import { ContextDirective, MenuItem } from '../../../../../projects/contexr/src/public-api';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-arguments-example',
  standalone: true,
  template: `
    <div class="example" [ctx]="menu">
      Type a name and press 'a' or use the context menu to announce it.
      <br />
      Name: <input [(ngModel)]="name" />
    </div>
  `,
  imports: [
    ContextDirective,
    FormsModule
  ]
})
export class ArgumentsExampleComponent {
  name?: string;

  menu: MenuItem[] = [
    {
      label: "Announce name",
      action: (name: string) => {
        alert("Name is " + name);
      },
      hotkey: 'a',
      args: () => this.name
    }
  ]
}
