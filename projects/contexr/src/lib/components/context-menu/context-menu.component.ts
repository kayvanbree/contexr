import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {ContextState} from '../../types/context-state';
import {ContexrService} from '../../providers/contexr.service';
import {Subscription} from 'rxjs';
import {Option, Submenu, MenuItem} from '../../types/menu-item';

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
    this.contextState = {
      open: false
    };
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
   * @param event
   */
  @HostListener('document:contextmenu', ['$event'])
  onDocumentContextMenu(event: MouseEvent): void {
    this.contexr.open(event);
  }

  /**
   * Subscribe to the context menu state
   */
  public ngOnInit() {
    this.contextStateSub = this.contexr.getContextState().subscribe((value) => {
      this.contextState = value;
    });
  }

  /**
   * Unsub from the context menu state
   */
  public ngOnDestroy(): void  {
    this.contextStateSub.unsubscribe();
  }

  /**
   * Check if this is an option
   * @param option
   * @returns
   */
  public isOption(option: MenuItem): boolean {
    return (option as Option).action != null;
  }

  /**
   * Is this context menu entry a submenu?
   * @param submenu
   */
  public isSubmenu(submenu: MenuItem): boolean {
    return (submenu as Submenu).items != null;
  }
}
