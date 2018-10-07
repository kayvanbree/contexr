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
    const rect = this.element.nativeElement.getBoundingClientRect();
    if (this.element.nativeElement) {
      return {
        'left': rect.width + 'px',
        'top': this.element.nativeElement.offsetTop + 'px'
      };
    }
    return {};
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
