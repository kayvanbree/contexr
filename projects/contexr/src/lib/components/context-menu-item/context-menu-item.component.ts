import {Component, Input} from '@angular/core';
import {ContextMenuItem} from '../../types/context-menu-item';
import {ContextMenuService} from '../../providers/context-menu.service';
import {ContexrService} from '../../providers/contexr.service';

@Component({
  selector: 'ctx-context-menu-item',
  templateUrl: './context-menu-item.component.html',
  styleUrls: ['./context-menu-item.component.css']
})
export class ContextMenuItemComponent {

  @Input() item: ContextMenuItem;

  constructor(
    private contextMenuService: ContextMenuService,
    private contexr: ContexrService
  ) { }

  /**
   * Call an action and close the context menu
   * @param context
   */
  public act(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.contexr.act(this.item);
    this.contextMenuService.close();
  }
}
