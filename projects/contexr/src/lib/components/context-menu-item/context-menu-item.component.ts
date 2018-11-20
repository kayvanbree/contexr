import {Component, Input} from '@angular/core';
import {ContextMenuItem} from '../../types/context-menu-item';
import {ContextMenuService} from 'contexr/lib/providers/context-menu.service';

@Component({
  selector: 'ctx-context-menu-item',
  templateUrl: './context-menu-item.component.html',
  styleUrls: ['./context-menu-item.component.css']
})
export class ContextMenuItemComponent {

  @Input() item: ContextMenuItem;

  constructor(private contextMenuService: ContextMenuService) { }

  /**
   * Call an action and close the context menu
   * @param context
   */
  public act(): void {
    this.item.action(this.item.args);
    this.contextMenuService.close();
  }
}
