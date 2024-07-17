import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {ContextState} from '../types/context-state';
import {Option} from '../types/option';
import {Hotkey, HotkeysService} from 'angular2-hotkeys';
import {Submenu} from '../types/submenu';
import { ContextMenu } from '../types/context-menu';

@Injectable({
  providedIn: 'root'
})
export class ContexrService {
  private menu: ContextMenu;
  private static currentContext: Array<Option | Submenu>;

  private contextStateSubject: Subject<ContextState> = new Subject<ContextState>();
  private contextStateObservable: Observable<ContextState> = this.contextStateSubject.asObservable();

  constructor(private hotkeysService: HotkeysService) { 
    this.menu = new ContextMenu([]);
    ContexrService.currentContext = [];
  }

  /**
   * Reset the current context
   */
  public reset() {
    ContexrService.currentContext = [];
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
    this.addCurrentContext('all', null);
    this.contextStateSubject.next({
      open: true,
      menu: ContexrService.currentContext,
      top: event.clientY + window.scrollY,
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

  /**
   * Register an array of context menu items
   * @param newMenu
   */
  public registerContextMenu(newMenu: ContextMenu): void {
    this.menu.addMenu(newMenu);
  }

  /**
   * Recursively register hotkeys
   * @param entries 
   */
  private registerHotkeys(entries: Array<Option | Submenu>) {
    entries.forEach(entry => {
      if (entry instanceof Option) {
        this.registerHotkey(entry as Option);
      } else if (entry instanceof Submenu) {
        this.registerHotkeys(entry.entries);
      }
    })
  }

  /**
   * Register the hotkey if it doesn't exist yet
   * @param option 
   */
  private registerHotkey(option: Option) {
    if (option.hotkey !== null && !this.hotkeysService.get(option.hotkey)) {
      const hotkey = option.hotkey as string | string[];

      // this.hotkeysService.add(new Hotkey(hotkey, (event: KeyboardEvent): boolean => {
      //   const key = hotkey;

      //   for (let i = 0; i < this.currentContext.length; i++) {
      //     const item = this.currentContext[i] as any;
      //     if (item.hotkey === key) {
      //       item.action(item.args);
      //     }
      //   }
      //   return false;
      // }));
    }
  }

  /**
   * Add a context
   * @param context
   * @param arguments
   */
  public addCurrentContext(context: string, args: any) {
    ContexrService.currentContext = this.filterCurrentContext(this.menu.entries, ContexrService.currentContext, context, args);
  }

  /**
   * Filter all context items with our context string
   * @param menu
   * @param context
   * @returns
   */
  private filterCurrentContext(menu: Array<Option | Submenu>, existingContext: Array<Option | Submenu>, context: string, args: any): Array<Option | Submenu> {
    for (let i = 0; i < menu.length; i++) {
      if ((menu[i] as Option).action) {
        const option = Object.assign({}, menu[i]) as Option;
        if (option.context.includes(context)) {
          // Add context arguments
          if (args !== null) {
            option.args = args;
          }

          let existingOption = existingContext.find(x => JSON.stringify(x) == JSON.stringify(option));
          if (existingOption == null) {
            existingContext.push(option);
          } else {
            // If the option already exists, update it with the new args
            existingContext[existingContext.indexOf(existingOption)] = option;
          }
          // TODO: Register hotkey here, instead of at registerContextMenu
        }
      } else if ((menu[i] as Submenu).entries) {
        const submenu = Object.assign({}, menu[i]) as Submenu;
        let index = existingContext.findIndex(x => x instanceof Submenu && x.text === submenu.text);

        // If the submenu does not exist yet, we can ignore current context to filter submenu entries
        if (index === -1) {
          submenu.entries = this.filterCurrentContext(submenu.entries, [], context, args);
          if (submenu.entries.length > 0) {
            existingContext.push(submenu);
          }
        } else {
          submenu.entries = this.filterCurrentContext(submenu.entries, (existingContext[index] as Submenu).entries, context, args);
          if (submenu.entries.length > 0) {
            existingContext[index] = submenu;
          }
        }
      }
    }
    return existingContext;
  }
}
