import {Component, ComponentRef, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Submenu} from 'contexr';
import {ContextMenuEntry, ContextMenuItem} from 'contexr/lib/types/context-menu-item';

@Component({
  selector: 'ctx-submenu',
  templateUrl: './submenu.component.html',
  styleUrls: ['./submenu.component.css']
})
export class SubmenuComponent implements OnInit {

  @Input() item: Submenu;

  constructor(private element: ElementRef) { }

  ngOnInit() {
  }

  /**
   * Make the submenu fit in the screen
   * @param {ElementRef} element
   * @returns {{}}
   */
  public getSubMenuPosition() {
    if (this.element.nativeElement.offsetParent) {
      return {
        'left': this.element.nativeElement.offsetParent.clientWidth + 'px',
        'top': this.getHeightOffset() + 'px'
      };
    }
    return {};
  }

  /**
   * Calculate what the offset must be for this sub menu
   * @returns {number}
   */
  private getHeightOffset() {
    const offset = this.element.nativeElement.offsetParent.clientHeight;
    const height = 27;
    return offset - height;
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
