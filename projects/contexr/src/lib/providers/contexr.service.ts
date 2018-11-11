import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {ContextState} from '../types/context-state';
import {ContextMenuItem} from '../types/context-menu-item';
import {Hotkey, HotkeysService} from 'angular2-hotkeys';
import {ContextMenuEntry} from '../types/context-menu-entry';
import {Submenu} from '../types/submenu';

@Injectable({
  providedIn: 'root'
})
export class ContexrService {

  private context: ContextMenuEntry[] = [];
  private currentContext: ContextMenuEntry[] = [];
  private actions: any[] = [];

  private contextStateSubject: Subject<ContextState> = new Subject<ContextState>();
  private contextStateObservable: Observable<ContextState> = this.contextStateSubject.asObservable();

  constructor(private hotkeysService: HotkeysService) { }

  /**
   * Reset the current context
   */
  public reset() {
    this.currentContext = [];
  }

  /**
   * Add a context
   * @param context
   * @param arguments
   */
  public addCurrentContext(context: string, args: any, id: Symbol) {
    this.addItemsInContext(this.context, context, id, args);
  }

  /**
   * Register a context menu person to show up at some context
   * @param context
   */
  public registerContextMenuItem(context: ContextMenuEntry): void {
    const index = this.indexOfContext(context);
    if (index !== -1) {
      this.context[index] = context;
    } else {
      this.context.push(context);
    }
    if ((context as any).hotkey && (context as any).hotkey && !this.hotkeysService.get((context as any).hotkey)) {
      this.hotkeysService.add(new Hotkey((context as any).hotkey, (event: KeyboardEvent): boolean => {
        const key = (context as any).hotkey;

        for (let i = 0; i < this.currentContext.length; i++) {
          const item = this.currentContext[i] as any;
          if (item.hotkey === key) {
            item.action(item.args);
          }
        }
        return false;
      }));
    }
  }

  /**
   * Register an array of context menu items
   * @param context
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
  public open(event: MouseEvent): void {
    this.addItemsInContext(this.context, 'all', Symbol(), null);
    this.contextStateSubject.next({
      open: true,
      context: this.currentContext,
      top: event.clientY + window.pageYOffset,
      left: event.clientX
    });
  }

  /**
   * Filter all context items with our context string
   * @param items
   * @param context
   * @returns
   */
  private addItemsInContext(items: ContextMenuEntry[], context: string, id: Symbol, args: any) {
    for (let i = 0; i < items.length; i++) {
      if ((items[i] as ContextMenuItem).action) {
        const action = Object.assign({}, items[i]) as ContextMenuItem;
        if (args !== null) {
          action.args = args;
        }
        action.id = id;
        if (action.context.indexOf(context) !== -1) {
          this.currentContext.push(action);
        }
      } else if ((items[i] as Submenu).children) {
        const submenu = Object.assign({}, items[i]) as Submenu;
        this.addItemsInContext(
          (items[i] as Submenu).children,
          context,
          id,
          args,
        );
        if (submenu.children.length > 0) {
          this.currentContext.push(submenu);
        }
      }
    }
  }

  /**
   * Recursively check if a context string already exists
   * @param items
   * @param context
   */
  private indexOfContext(item: ContextMenuEntry): number {
    for (let i = 0; i < this.context.length; i++) {
      if (JSON.stringify(this.context[i]) === JSON.stringify(item)) {
        return i;
      }
    }
    return -1;
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
