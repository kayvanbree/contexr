import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {ContextState} from '../../types/context-state';
import {ContexrService} from '../../providers/contexr.service';
import {Subscription} from 'rxjs';
import {ContextMenuItem} from '../../types/context-menu-item';
import {ContextMenuEntry} from '../../types/context-menu-entry';
import {Submenu} from 'contexr/lib/types/submenu';

@Component({
  selector: 'ctx-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.scss']
})
export class ContextMenuComponent implements OnInit, OnDestroy {
  public open = false;
  public contextState: ContextState;

  private contextStateSub: Subscription;

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
   * @param event
   */
  onContextMenu(event): void {
    event.stopPropagation();
  }

  /**
   * Prevent a click from the context menu to propagate further
   * @param event
   */
  onClick(event): void {
    event.stopPropagation();
  }

  /**
   * Show context menu for our context or for all
   * @param event
   */
  @HostListener('document:contextmenu', ['$event'])
  onDocumentContextMenu(event): void {
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
