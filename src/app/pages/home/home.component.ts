import { Component } from '@angular/core';
import { ContexrModule } from '../../../../projects/contexr/src/public-api';
import { CommonModule } from '@angular/common';
import { SimpleMenuExampleComponent } from '../simple-menu-example/options-example-page.component';

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [
    CommonModule,
    ContexrModule,
    SimpleMenuExampleComponent
]
})
export class HomeComponent {
  constructor() {
  }
}
