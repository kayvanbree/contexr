import { Injectable, Injector } from '@angular/core';
import {CONTEXT_STATE, ContextState} from '../types/context-state';
import {Hotkey, HotkeysService} from 'angular2-hotkeys';
import { ContextMenuDialogComponent } from '../components/context-menu-dialog/context-menu-dialog.component';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { MENU_STACK, MenuStack } from '@angular/cdk/menu';
import { MenuItem } from '../types/menu-item';
import { Option } from '../types/option';
import { Submenu } from '../types/submenu';
import { MenuMerger } from '../helper/menu-merger';

@Injectable({
  providedIn: 'root'
})
export class ContexrService {
  private registeredContext: {[id: string] : MenuItem[]} = {};
  private registeredHotkeys: {[id: string] : Hotkey[]} = {};

  private componentPortal!: ComponentPortal<ContextMenuDialogComponent>;
  private overlayRef!: OverlayRef;
  
  constructor(private hotkeysService: HotkeysService, private overlay: Overlay) {}

  /**
   * Register a context menu
   * @param uuid 
   * @param menu 
   * @param args 
   */
  public registerMenu(uuid: string, menu: MenuItem[], args: any) {
    this.unregisterHotkeys(uuid);
    this.registeredContext[uuid] = menu;
    this.registeredHotkeys[uuid] = [];
    this.registerHotkeys(uuid, menu, args);
  }

  /**
   * Unregister a context menu
   * @param uuid 
   */
  public unregisterMenu(uuid: string) {
    if (this.registeredHotkeys[uuid] != null || this.registeredContext[uuid] != null) {
      this.unregisterHotkeys(uuid);
      delete this.registeredHotkeys[uuid];
      delete this.registeredContext[uuid];
    }
  }

  public open(event?: MouseEvent) {
    if (event) {
      event.preventDefault();
    }

    // Close any open context menus
    this.close();

    // Create overlay ref and save it
    this.overlayRef = this.overlay.create(this.getOverlayConfig(event));

    const injector = this.createInjector({
      items: this.getMergedMenus(),
      service: this
    });

    // Attach ref to overlay
    this.componentPortal = new ComponentPortal(ContextMenuDialogComponent, null, injector);
    this.overlayRef.attach(this.componentPortal);
  }

  /**
   * Close the context menu
   */
  public close(): void {
    if (this.overlayRef) {
      this.overlayRef.dispose();
    }
  }

  private createInjector(contextState: ContextState): Injector {
    return Injector.create({
      providers: [
        { provide: CONTEXT_STATE, useValue: contextState },
        { provide: MENU_STACK, useFactory: (parentMenuStack?: MenuStack) => parentMenuStack || MenuStack.inline("horizontal")}
      ]
    });
  }

  /**
   * Create the config for the overlay
   * @param event 
   * @returns 
   */
  private getOverlayConfig(event?: MouseEvent): OverlayConfig {
    let positionStrategy;
    if (event) {
      positionStrategy = this.overlay.position()
        .global()
        .top(event.clientY + window.scrollY + "px")
        .left(event.clientX + "px");
    } else {
      positionStrategy = this.overlay.position()
        .global();
    }
    

    const overlayConfig = new OverlayConfig({
      scrollStrategy: this.overlay.scrollStrategies.close(),
      positionStrategy
    });

    return overlayConfig;
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
        this.registeredHotkeys[uuid].push(hotkey);
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
    let hotkeys: Hotkey[] = this.registeredHotkeys[uuid];
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

    for (let uuid in this.registeredContext) {
      mergedMenus = MenuMerger.mergeMenus(mergedMenus, this.registeredContext[uuid]);
    }

    return mergedMenus;
  }
}
