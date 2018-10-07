import {Component} from '@angular/core';
import {ContexrService} from '../../projects/contexr/src/lib/providers/contexr.service';
import {ContextMenuItem} from 'contexr/lib/types/context-menu-item';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private contexr: ContexrService) {}
}
