import {Component, ElementRef, Input, OnChanges} from '@angular/core';
import {ContextMenuItem} from '../../types/context-menu-item';
import {Submenu} from '../../types/submenu';
import {ContextMenuEntry} from '../../types/context-menu-entry';

@Component({
  selector: 'ctx-submenu',
  templateUrl: './submenu.component.html',
  styleUrls: ['./submenu.component.css']
})
export class SubmenuComponent implements OnChanges {

  @Input() item: Submenu;

  constructor(private element: ElementRef) { }

  public subMenuStyle = {};

  public ngOnChanges(): void {
    const rect = this.element.nativeElement.getBoundingClientRect();
    this.subMenuStyle = {
      'left': 214 + 'px',
      'top': rect.offsetHeight + 'px'
    };
  }

  /**
   * Check if this is an action
   * @param item
   * @returns
   */
  public isAction(item: ContextMenuEntry): boolean {
    return !!(item as ContextMenuItem).action;
  }
}
