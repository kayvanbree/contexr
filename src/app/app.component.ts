import {Component} from '@angular/core';
import {ContexrService} from '../../projects/contexr/src/lib/providers/contexr.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ContexrModule, Option } from '../../projects/contexr/src/public-api';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { ContextMenu } from '../../projects/contexr/src/lib/types/context-menu';

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
    MatToolbarModule,
    MatButtonModule,
    ContexrModule
  ]
})
export class AppComponent {
  title = 'app';

  context = new ContextMenu([
    new Option({
      text: 'All',
      context: ['all'],
      action: () => {
        console.log('This appears on all context menus');
      }
    })
  ]);

  constructor(private contexr: ContexrService) {
    this.contexr.registerContextMenu(this.context);
  }
}
