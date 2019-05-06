import {ElementRef, Injectable, Injector} from '@angular/core';
import {
  Overlay,
  OverlayRef,
} from '@angular/cdk/overlay';
import {ComponentPortal, PortalInjector} from '@angular/cdk/portal';
import {CONTEXT_MENU_OVERLAY_DATA, ContextMenuComponent} from '../components/context-menu/context-menu.component';
import {ContextState} from '../types/context-state';
import {ContextMenuOverlayRef} from '../types/context-menu-overlay-ref';
import {ContextMenuEntry} from '../types/context-menu-entry';
import {ContexrService} from './contexr.service';

@Injectable({
  providedIn: 'root'
})
export class ContextMenuService {
  private overlayRef: OverlayRef;
  private context: ContextMenuEntry[];

  constructor(
    private overlay: Overlay,
    private injector: Injector,
    private contexr: ContexrService
  ) {}

  /**
   * Bootstrap our document click, contextmenu and scrol eventListeners.
   */
  public initialize() {
    this.contexr.getContext().subscribe(value => {
      this.context = value;
    });
    window.addEventListener('click', (event: MouseEvent) => {
      this.contexr.addCurrentContext('all', null);
      this.contexr.prepareContext();
      this.close();
    });
    window.addEventListener('contextmenu', (event: MouseEvent) => {
      this.contexr.addCurrentContext('all', null);
      this.contexr.prepareContext();
      this.open(event, {
        context: this.context,
        top: event.clientY,
        left: event.clientX
      });
    });
    // Event capturing (not possible in real Angular yet)
    window.addEventListener('click', (event) => {
      event.preventDefault();
      this.contexr.reset();
    }, true);
    window.addEventListener('contextmenu', (event) => {
      event.preventDefault();
      this.contexr.reset();
      this.close();
    }, true);
    window.addEventListener('scroll', (event) => {
      event.preventDefault();
      this.contexr.reset();
      this.close();
    });
  }

  /**
   * Open the context menu
   * @param event
   * @param state
   */
  private open(event: MouseEvent, state: ContextState) {
    if (state.context && state.context.length > 0) {
      const overlayConfig = this.getContextMenuConfig(event, state);
      this.overlayRef = this.overlay.create(overlayConfig);
      const contextMenuRef = new ContextMenuOverlayRef(this.overlayRef);
      this.attachContextMenuOverlay(this.overlayRef, state, contextMenuRef);
    }
  }

  /**
   * Close the context menu
   */
  public close() {
    if (this.overlayRef) {
      this.overlayRef.dispose();
    }
  }

  /**
   * Get the configuration that will prevent our ContextMenu from appearing
   * outside the page.
   * @param event
   * @param state
   */
  private getContextMenuConfig(event: MouseEvent, state: ContextState) {
    const target = {
      getBoundingClientRect: (): ClientRect => ({
        bottom: event.clientY,
        height: 0,
        left: event.clientX,
        right: event.clientX,
        top: event.clientY,
        width: 0,
      }),
    };

    const element = new ElementRef(target);

    const positionStrategy = this.overlay.position()
      .flexibleConnectedTo(element)
      .withFlexibleDimensions(false)
      .withPositions([
        {
          originX: 'end',
          originY: 'top',
          overlayX: 'start',
          overlayY: 'top',
        },
        {
          originX: 'start',
          originY: 'top',
          overlayX: 'end',
          overlayY: 'top',
        },
        {
          originX: 'end',
          originY: 'bottom',
          overlayX: 'start',
          overlayY: 'bottom',
        },
        {
          originX: 'start',
          originY: 'bottom',
          overlayX: 'end',
          overlayY: 'bottom',
        },
      ]);

    return {
      positionStrategy: positionStrategy
    };
  }

  /**
   * Create an injector, so we can inject the ContextState into our context menu
   * @param state
   * @param dialogRef
   */
  private createContextMenuInjector(state: ContextState, dialogRef: ContextMenuOverlayRef) {
    const injectionTokens = new WeakMap();
    injectionTokens.set(ContextMenuOverlayRef, dialogRef);
    injectionTokens.set(CONTEXT_MENU_OVERLAY_DATA, state);
    return new PortalInjector(this.injector, injectionTokens);
  }

  /**
   * Attach the context menu overlay to the overlayRef
   * @param overlayRef
   * @param state
   * @param contextMenuOverlayRef
   */
  private attachContextMenuOverlay(overlayRef: OverlayRef, state: ContextState, contextMenuOverlayRef: ContextMenuOverlayRef) {
    const injector = this.createContextMenuInjector(state, contextMenuOverlayRef);
    const containerPortal = new ComponentPortal(ContextMenuComponent, null, injector);
    overlayRef.attach(containerPortal);
  }
}
