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
    ContexrService.registeredContext[uuid] = menu;
  }

  /**
   * Unregister a context menu
   * @param uuid 
   */
  public unregisterMenu(uuid: string) {
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
    ContexrService.registeredContext = {};
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
      }
    }
    return mergedItems.sort((a, b) => {
      return (a.priority ? a.priority : 0) - (b.priority ? b.priority : 0)
    });
  }
}
