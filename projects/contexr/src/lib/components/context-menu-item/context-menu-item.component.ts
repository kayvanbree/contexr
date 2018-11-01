import {Component, Input, OnInit} from '@angular/core';
import {ContextMenuItem} from '../../types/context-menu-item';
import {ContexrService} from '../../providers/contexr.service';

@Component({
  selector: 'ctx-context-menu-item',
  templateUrl: './context-menu-item.component.html',
  styleUrls: ['./context-menu-item.component.css']
})
export class ContextMenuItemComponent implements OnInit {

  @Input() item: ContextMenuItem;

  constructor(private contexr: ContexrService) { }

  ngOnInit() {
  }

  /**
   * Call an action and close the context menu
   * @param context
   */
  public act(): void {
    this.item.action();
    this.contexr.close();
  }
}
