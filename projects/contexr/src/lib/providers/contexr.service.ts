import {Injectable} from '@angular/core';
import {ContextMenuItem} from '../types/context-menu-item';
import {Hotkey, HotkeysService} from 'angular2-hotkeys';
import {ContextMenuEntry} from '../types/context-menu-entry';
import {Submenu} from '../types/submenu';
import {BehaviorSubject, Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContexrService {

  private context: ContextMenuEntry[] = [];
  private currentContext: ContextMenuEntry[] = [];

  private currentContextSubject: Subject<ContextMenuEntry[]> = new BehaviorSubject<ContextMenuEntry[]>([]);
  private currentContextObservable: Observable<ContextMenuEntry[]> = this.currentContextSubject.asObservable();

  private currentContextArgs: any[];

  constructor(private hotkeysService: HotkeysService) {}

  public getContext(): Observable<ContextMenuEntry[]> {
    return this.currentContextObservable;
  }

  /**
   * Add a context
   * @param context
   * @param arguments
   */
  public addCurrentContext(context: string, args: any) {
    this.currentContextArgs.push({context: context, args: args});
  }

  public prepareContext() {
    this.doSomeRecursiveStuff(this.context);
    this.currentContextSubject.next(this.currentContext);
  }

  private doSomeRecursiveStuff(items: ContextMenuEntry[]) {
    for (let i = 0; i < items.length; i++) {
      if ((items[i] as ContextMenuItem).action) {
        const item = items[i] as ContextMenuItem;

        let inContext = false;
        let args = null;
        for (let j = 0; j < this.currentContextArgs.length; j++) {
          inContext = item.context.indexOf(this.currentContextArgs[j].context) !== -1;
          if (inContext) {
            args = this.currentContextArgs[j];
            break;
          }
        }
        const action = {
          ...item,
          inContext: !!inContext,
          args: args
        } as ContextMenuItem;

        this.currentContext.push(action);
      } else if ((items[i] as Submenu).children) {
        const submenu = Object.assign({}, items[i]) as Submenu;
        this.doSomeRecursiveStuff((items[i] as Submenu).children);
        if (submenu.children.length > 0) {
          this.currentContext.push(submenu);
        }
      }
    }
  }

  /**
   * Reset the context state
   */
  public reset() {
    this.currentContextArgs = [];
    this.currentContext = [];
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
   * Filter all context items with our context string
   * @param items
   * @param context
   * @returns
   */
  private addItemsInContext(items: ContextMenuEntry[], context: string, args: any) {
    for (let i = 0; i < items.length; i++) {
      if ((items[i] as ContextMenuItem).action) {
        const action = Object.assign({}, items[i]) as ContextMenuItem;
        if (args !== null) {
          action.args = args;
        }
        if (action.context.indexOf(context) !== -1) {
          this.currentContext.push(action);
        }
      } else if ((items[i] as Submenu).children) {
        const submenu = Object.assign({}, items[i]) as Submenu;
        this.addItemsInContext(
          (items[i] as Submenu).children,
          context,
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
}
