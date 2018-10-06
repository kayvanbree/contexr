import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {ContextState} from '../../types/context-state';
import {ContexrService} from '../../providers/contexr.service';
import {Subscription} from 'rxjs';
import {Context} from '../../types/context';

@Component({
  selector: 'ctx-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.scss']
})
export class ContextMenuComponent implements OnInit, OnDestroy {

  public open = false;
  public contextState: ContextState;

  private contextStateSub: Subscription;

  constructor(public contexr: ContexrService) { }

  /**
   * Close the context menu when we click somewhere else
   */
  @HostListener('document:click', ['$event'])
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
    event.preventDefault();
    let context = event.srcElement.getAttribute('ctx');
    if (!context) {
      context = 'all';
    }
    this.contexr.open(event, context);
  }

  /**
   * Call an action and close the context menu
   * @param {Context} context
   */
  public act(context: Context): void {
    context.action();
    this.contexr.close();
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
}
