import {Component} from '@angular/core';
import {ContexrService} from '../../projects/contexr/src/lib/providers/contexr.service';
import { MatToolbar, MatToolbarRow } from '@angular/material/toolbar';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ContexrModule } from '../../projects/contexr/src/public-api';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatToolbar,
    MatToolbarRow,
    ContexrModule
  ]
})
export class AppComponent {
  title = 'app';

  context: any = [
    {
      text: 'My first context!',
      context: ['my-first-context'],
      action: () => {
        console.log('You just clicked the first context item!');
      },
      hotkey: 'y'
    },
    {
      text: 'Say hello',
      context: ['block'],
      action: () => {
        alert('HELLO');
      },
      hotkey: 'h'
    },
    {
      text: 'Say my name',
      context: ['say-my-name'],
      action: (args: any) => {
        alert('My name is ' + args.name);
      }
    },
    {
      text: 'All',
      context: ['all'],
      action: () => {
        console.log('This appears on all context menus');
      }
    }
  ];

  constructor(private contexr: ContexrService) {
    this.contexr.registerContextMenuItem(this.context);
  }
}
