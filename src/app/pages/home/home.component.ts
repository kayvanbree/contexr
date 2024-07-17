import { Component } from '@angular/core';
import { ContexrModule, ContexrService } from '../../../../projects/contexr/src/public-api';
import { CommonModule } from '@angular/common';
import { Option } from '../../../../projects/contexr/src/lib/types/option';
import { ContextMenu } from '../../../../projects/contexr/src/lib/types/context-menu';

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [
    CommonModule,
    ContexrModule,
  ]
})
export class HomeComponent {
  public install1 = `npm install --save contexr`;

  public install2 = `<!-- Your application code -->
<ctx-context-menu></ctx-context-menu>`;

  /**
   * Example 1
   */
  count = 0;
  example1Context = new ContextMenu([
    new Option({
      text: 'Increase',
      context: ['count'],
      action: () => {
        this.count++;
      },
      hotkey: 'i'
    }),
    new Option({
      text: 'Decrease',
      context: ['count'],
      action: () => {
        this.count--;
      },
      hotkey: 'd'
    })
  ]);

  public example1_code1 = `count = 0;
context = [
  {
    text: 'Increase',
    context: ['increase-count'],
    action: () => {
      this.count++;
    },
    hotkey: 'i'
  }
];`;

  public example1_code2 = `constructor(private contexr: ContexrService) {
  this.contexr.registerContextMenuItems(this.context);
}`;

  public example1_code3 = `<div
  [ctx]="'increase-count'"
  style="background: lightblue; padding: 20px;"
>
  Use the context menu to increase the count.
  <br />
  Count: {{count}}
</div>`;

  public example2_code1 = `const context: any = [
  // Your other context items
  {
    text: 'Say my name',
    context: ['say-my-name'],
    action: (args: any) => {
      console.log('My name is ' + args.name);
    }
  }
];`;

  public example2_code2 = `<table style="background: grey;">
  <tr>
    <td>Name</td>
    <td>City</td>
    <td>Country</td>
  </tr>
  <tr style="background: #b0b0b0;" [ctx]="'say-my-name'" [ctxArgs]="{name: 'Heisenberg'}">
    <td>Heisenberg</td>
    <td>Albuquerque</td>
    <td>Henk</td>
  </tr>
  <tr style="background: #b0b0b0;" [ctx]="'say-my-name'" [ctxArgs]="{name: 'Jesse'}">
    <td>Jesse</td>
    <td>Albuquerque</td>
    <td>Peter</td>
  </tr>
</table>`;

  example2Context: ContextMenu = new ContextMenu([
    new Option({
      text: 'My first context!',
      context: ['my-first-context'],
      action: () => {
        console.log('You just clicked the first context item!');
      },
      hotkey: 'y'
    }),
    new Option({
      text: 'Say hello',
      context: ['block'],
      action: () => {
        alert('HELLO');
      },
      hotkey: 'h'
    }),
    new Option({
      text: 'Say my name',
      context: ['say-my-name'],
      action: (args: any) => {
        alert('My name is ' + args.name);
      }
    })
  ]);

  constructor(private contexr: ContexrService) {
    this.contexr.registerContextMenu(this.example1Context);
    this.contexr.registerContextMenu(this.example2Context);
  }
}
