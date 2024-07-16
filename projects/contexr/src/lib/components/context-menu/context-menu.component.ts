import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {ContextState} from '../../types/context-state';
import {ContexrService} from '../../providers/contexr.service';
import {Subscription} from 'rxjs';
import {ContextMenuItem} from '../../types/context-menu-item';
import {ContextMenuEntry} from '../../types/context-menu-entry';
import {SubmenuComponent} from '../submenu/submenu.component';
import { Submenu } from '../../types/submenu';

@Component({
  selector: 'ctx-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.scss']
})
export class ContextMenuComponent implements OnInit, OnDestroy {
  public open = false;
  public contextState!: ContextState;

  private contextStateSub!: Subscription;

  constructor(public contexr: ContexrService) {
    // Event capturing (not possible in real Angular yet)
    document.addEventListener('click', (event) => {
      event.preventDefault();
      this.contexr.reset();
    }, true);
    document.addEventListener('contextmenu', (event) => {
      event.preventDefault();
      this.contexr.reset();
    }, true);
  }

  /**
   * Close the context menu when we click somewhere else
   */
  @HostListener('document:click')
  onDocumentClick(): void {
    this.contexr.close();
  }

  /**
   * Prevent a right click from the context menu to propagate further
   * TODO: Typesafe
   * @param event
   */
  onContextMenu(event: any): void {
    event.stopPropagation();
  }

  /**
   * Prevent a click from the context menu to propagate further
   * TODO: Typesafe
   * @param event
   */
  onClick(event: any): void {
    event.stopPropagation();
  }

  /**
   * Show context menu for our context or for all
   * TODO: Typesafe
   * @param event
   */
  @HostListener('document:contextmenu', ['$event'])
  onDocumentContextMenu(event: any): void {
    this.contexr.open(event);
  }

  /**
   * Subscribe to the context menu state
   */
  public ngOnInit() {
    this.contextStateSub = this.contexr.getContextState().subscribe((value) => {
      this.contextState = value;
      this.open = !!this.contextState.context;
    });
  }

  /**
   * Unsub from the context menu state
   */
  public ngOnDestroy(): void  {
    this.contextStateSub.unsubscribe();
  }

  /**
   * Check if this is an action
   * TODO: Wth is this ugly way of checking the type?
   * @param item
   * @returns
   */
  public isAction(item: ContextMenuEntry): boolean {
    return !(item as ContextMenuItem).hideMenu;
  }

  /**
   * TODO: Make this prettier
   * @param item
   * @returns 
   */
  public asAction(item: ContextMenuEntry): ContextMenuItem {
    return item as ContextMenuItem;
  }

  /**
   * Is this context menu entry a submenu?
   * TODO: Wth is this ugly way of checking the type?
   * @param item
   */
  public isSubmenu(item: ContextMenuEntry): boolean {
    return !!(item as Submenu).children;
  }

  /**
   * TODO: Make this prettier
   * @param item
   * @returns 
   */
  public asSubmenu(item: ContextMenuEntry): Submenu {
    return item as Submenu;
  }
}
