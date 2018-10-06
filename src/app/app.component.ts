import { Component } from '@angular/core';
import {ContexrService} from '../../projects/contexr/src/lib/providers/contexr.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private contexr: ContexrService) {}

  public openContext(event: MouseEvent, context: string): void {
    this.contexr.open(event, context);
  }
}
