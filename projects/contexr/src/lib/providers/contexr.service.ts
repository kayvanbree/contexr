import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {ContextState} from '../types/context-state';
import {Hotkey, HotkeysService} from 'angular2-hotkeys';
import { MenuItem, Option, Submenu } from '../types/menu-item';

@Injectable({
  providedIn: 'root'
})
export class ContexrService {
  private contextStateSubject: Subject<ContextState> = new Subject<ContextState>();
  private contextStateObservable: Observable<ContextState> = this.contextStateSubject.asObservable();

  private static registeredContext: {[id: string] : MenuItem[]} = {};
  private static registeredHotkeys: {[id: string] : Hotkey[]} = {};
  
  constructor(private hotkeysService: HotkeysService) {}

  /**
   * Returns the state of the context menu
   * @returns
   */
  public getContextState(): Observable<ContextState> {
    return this.contextStateObservable;
  }

  /**
   * Register a context menu
   * @param uuid 
   * @param menu 
   * @param args 
   */
  public registerMenu(uuid: string, menu: MenuItem[], args: any) {
    this.unregisterHotkeys(uuid);
    ContexrService.registeredContext[uuid] = menu;
    ContexrService.registeredHotkeys[uuid] = [];
    this.registerHotkeys(uuid, menu, args);
  }

  /**
   * Unregister a context menu
   * @param uuid 
   */
  public unregisterMenu(uuid: string) {
    this.unregisterHotkeys(uuid);
    delete ContexrService.registeredHotkeys[uuid];
    delete ContexrService.registeredContext[uuid];
  }

  public open(event: MouseEvent) {
    this.contextStateSubject.next({
      open: true,
      items: this.getMergedMenus(),
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
   * Reset the current context
   */
  public reset() {
    // for (let uuid in ContexrService.registeredContext) {
    //   this.unregisterHotkeys(ContexrService.registeredContext[uuid]);
    // }
    // ContexrService.registeredContext = {};
  }

  /**
   * Registers hotkeys with the service
   * @param menu 
   */
  private registerHotkeys(uuid: string, menu: MenuItem[], args: any) {
    for (let item of menu) {
      if ((item as Option).hotkey) {
        let option = item as Option;
        let hotkey = new Hotkey(
          option.hotkey as string,
          (event: KeyboardEvent): boolean => {
            // If this option has an arguments callback, use it, otherwise call without arguments
            option.args ? option.action(option.args()) : option.action();
            return false;
          }, 
          undefined, 
          option.label,
          undefined,
          false
        );
        this.hotkeysService.add(hotkey);
        ContexrService.registeredHotkeys[uuid].push(hotkey);
      }
      if ((item as Submenu).items) {
        this.registerHotkeys(uuid, (item as Submenu).items, args);
      }
    }
  }

  /**
   * Unregisters hotkeys with the service
   * @param menu 
   */
  private unregisterHotkeys(uuid: string) {
    let hotkeys: Hotkey[] = ContexrService.registeredHotkeys[uuid];
    if (hotkeys) {
      for (let hotkey of hotkeys) {
        this.hotkeysService.remove(hotkey);
      }
    }
  }

  /**
   * Iterate over the registered menus and merge them into a new one
   * @returns 
   */
  private getMergedMenus(): MenuItem[] {
    let mergedMenus: MenuItem[] = [];

    for (let uuid in ContexrService.registeredContext) {
      mergedMenus = this.mergeMenus(mergedMenus, ContexrService.registeredContext[uuid]);
    }

    return mergedMenus;
  }

  /**
   * Recursively merge options and submenus
   * @param menu1 
   * @param menu2 
   * @returns 
   */
  private mergeMenus(menu1: MenuItem[], menu2: MenuItem[]): MenuItem[] {
    let mergedItems: MenuItem[] = menu1.slice();
    for (let item of menu2) {
      if ((item as Option).action) {
        // If this is an option, just push it into the merged menu
        mergedItems.push(item);

      } else if ((item as Submenu).items) {
        let existingSubmenu = mergedItems.find(x => (x as Submenu).items && x.label === item.label) as Submenu;

        if (existingSubmenu && (item as Submenu).items) {
          // If this is a submenu, merge the items and put them in the existing submenu
          existingSubmenu.items = this.mergeMenus((existingSubmenu as Submenu).items, (item as Submenu).items);
        } else {
          // If a submenu with the same label is not found, just push a copy into the merged menu
          mergedItems.push({
            label: item.label,
            priority: item.priority,
            items: (item as Submenu).items.slice()
          });
        }
      } else if (item.label = "separator") {
        mergedItems.push(item);
      }
    }
    return mergedItems.sort((a, b) => {
      return (a.priority ? a.priority : 0) - (b.priority ? b.priority : 0)
    });
  }
}
