import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {ContextState} from '../types/context-state';
import {ContextMenuItem} from '../types/context-menu-item';
import {Hotkey, HotkeysService} from 'angular2-hotkeys';

@Injectable({
  providedIn: 'root'
})
export class ContexrService {

  private context: ContextMenuItem[] = [];

  private contextStateSubject: Subject<ContextState> = new Subject<ContextState>();
  private contextStateObservable: Observable<ContextState> = this.contextStateSubject.asObservable();

  constructor(private hotkeysService: HotkeysService) { }

  /**
   * Register a context menu item to show up at some context
   * @param context
   */
  public registerContextMenuItem(context: ContextMenuItem): void {
    this.context.push(context);
    if (context.hotkey) {
      this.hotkeysService.add(new Hotkey(context.hotkey, (event: KeyboardEvent): boolean => {
        context.action();
        return false;
      }));
    }
  }

  /**
   * Register an array of context menu items
   * @param {ContextMenuItem[]} context
   */
  public registerContextMenuItems(context: ContextMenuItem[]): void {
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
    this.contextStateSubject.next({
      open: true,
      context: this.context.filter((x) => {
        return x.context.indexOf(context) !== -1 || x.context.indexOf('all') !== -1;
      }),
      top: event.clientY,
      left: event.clientX
    });
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
