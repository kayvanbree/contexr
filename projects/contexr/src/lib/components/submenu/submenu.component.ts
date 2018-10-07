import {AfterViewChecked, Component, ComponentRef, ElementRef, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {Submenu} from 'contexr';
import {ContextMenuEntry, ContextMenuItem} from 'contexr/lib/types/context-menu-item';

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
   * @param {ContextMenuEntry} item
   * @returns {boolean}
   */
  public isAction(item: ContextMenuEntry): boolean {
    return !!(item as ContextMenuItem).action;
  }
}
