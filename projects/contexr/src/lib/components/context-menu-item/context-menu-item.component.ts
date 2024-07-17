import {Component, Input, OnInit} from '@angular/core';
import {Option} from '../../types/option';
import {ContexrService} from '../../providers/contexr.service';

@Component({
  selector: 'ctx-context-menu-item',
  templateUrl: './context-menu-item.component.html',
  styleUrls: ['./context-menu-item.component.css']
})
export class ContextMenuItemComponent implements OnInit {

  @Input() item!: Option;

  constructor(private contexr: ContexrService) { }

  ngOnInit() {
  }

  /**
   * Call an action and close the context menu
   * @param context
   */
  public act(): void {
    this.item.action(this.item.args);
    this.contexr.close();
  }
}
