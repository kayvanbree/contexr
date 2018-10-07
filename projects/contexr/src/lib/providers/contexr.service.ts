import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {ContextState} from '../types/context-state';
import {ContextMenuEntry, ContextMenuItem, Submenu} from '../types/context-menu-item';
import {Hotkey, HotkeysService} from 'angular2-hotkeys';

@Injectable({
  providedIn: 'root'
})
export class ContexrService {

  private context: ContextMenuEntry[] = [];

  private contextStateSubject: Subject<ContextState> = new Subject<ContextState>();
  private contextStateObservable: Observable<ContextState> = this.contextStateSubject.asObservable();

  constructor(private hotkeysService: HotkeysService) { }

  /**
   * Register a context menu item to show up at some context
   * @param context
   */
  public registerContextMenuItem(context: ContextMenuEntry): void {
    this.context.push(context);
    if ((context as any).hotkey &&  (context as any).hotkey) {
      this.hotkeysService.add(new Hotkey((context as any).hotkey, (event: KeyboardEvent): boolean => {
        (context as any).action();
        return false;
      }));
    }
  }

  /**
   * Register an array of context menu items
   * @param {ContextMenuItem[]} context
   */
  public registerContextMenuItems(context: ContextMenuEntry[]): void {
    for (let i = 0; i < context.length; i++) {
      this.registerContextMenuItem(context[i]);
    }
  }

  /**
   * Returns the state of the context menu
   * @returns
   */
  public getContextState(): Observable<ContextState> {
    return this.contextStateObservable;
  }

  /**
   * Open the context menu
   */
  public open(event: MouseEvent, context: string): void {
    const items = this.getItemsInContext(this.context, context);
    this.contextStateSubject.next({
      open: true,
      context: items,
      top: event.clientY,
      left: event.clientX
    });
  }

  /**
   * Filter all context items with our context string
   * @param {ContextMenuEntry[]} items
   * @param {string} context
   * @returns {ContextMenuEntry[]}
   */
  private getItemsInContext(items: ContextMenuEntry[], context: string): ContextMenuEntry[] {
    const itemsInContext: ContextMenuEntry[] = [];

    for (let i = 0; i < items.length; i++) {
      if ((items[i] as ContextMenuItem).action) {
        const action = Object.assign({}, items[i]) as ContextMenuItem;
        if (action.context.indexOf(context) !== -1 || action.context.indexOf('all') !== -1) {
          itemsInContext.push(action);
        }
      } else if ((items[i] as Submenu).children) {
        const submenu = Object.assign({}, items[i]) as Submenu;
        submenu.children = this.getItemsInContext(
          (items[i] as Submenu).children,
          context
        );
        if (submenu.children.length > 0) {
          console.log(submenu);
          itemsInContext.push(submenu);
        }
      }
    }

    return itemsInContext;
  }

  /**
   * Close the context menu
   */
  public close(): void {
    this.contextStateSubject.next({
      open: false
    });
  }
}
