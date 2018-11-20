import {Component, ElementRef, Inject, InjectionToken, OnInit} from '@angular/core';
import {ContextState} from '../../types/context-state';
import {ContextMenuItem} from '../../types/context-menu-item';
import {ContextMenuEntry} from '../../types/context-menu-entry';
import {Submenu} from 'contexr/lib/types/submenu';
import {ContextMenuOverlayRef} from 'contexr/lib/types/context-menu-overlay-ref';

export const CONTEXT_MENU_OVERLAY_DATA = new InjectionToken<ContextState>('CONTEXT_MENU_OVERLAY_DATA');

@Component({
  selector: 'ctx-context-menu-overlay',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.scss']
})
export class ContextMenuComponent {
  constructor(
    @Inject(CONTEXT_MENU_OVERLAY_DATA) public contextState: ContextState
  ) {}

  /**
   * Check if this is an action
   * @param item
   * @returns
   */
  public isAction(item: ContextMenuEntry): boolean {
    return !(item as ContextMenuItem).hideMenu;
  }

  /**
   * Is this context menu entry a submenu?
   * @param item
   */
  public isSubmenu(item: ContextMenuEntry): boolean {
    return !!(item as Submenu).children;
  }
}
