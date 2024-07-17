import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ContexrModule, ContexrService } from '../../../../projects/contexr/src/public-api';
import { ContextMenu } from '../../../../projects/contexr/src/lib/types/context-menu';
import { Submenu } from '../../../../projects/contexr/src/lib/types/submenu';
import { Option } from '../../../../projects/contexr/src/lib/types/option';


@Component({
  selector: 'app-counter',
  standalone: true,
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.scss',
  imports: [
    CommonModule,
    ContexrModule
  ],
})
export class CounterComponent {
  count = 0;
  counterMenu = new ContextMenu([
    new Submenu({ 
      text: "Counter",
      entries: [
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
      ]
    })
  ]);

  constructor(private contexr: ContexrService) {
    this.contexr.registerContextMenu(this.counterMenu);
  }
}
