import {ComponentRef, Injectable, Injector} from '@angular/core';
import {
  Overlay,
  OverlayRef,
} from '@angular/cdk/overlay';
import {ComponentPortal, PortalInjector} from '@angular/cdk/portal';
import {CONTEXT_MENU_OVERLAY_DATA, ContextMenuComponent} from '../components/context-menu/context-menu.component';
import {ContextState} from '../types/context-state';
import {ContextMenuOverlayRef} from '../types/context-menu-overlay-ref';

@Injectable({
  providedIn: 'root'
})
export class ContextMenuService {
  private overlayRef: OverlayRef;

  constructor(private overlay: Overlay, private injector: Injector) {}

  public open(state: ContextState) {
    const overlayConfig = this.getOverlayConfig(state);
    this.overlayRef = this.overlay.create(overlayConfig);
    const contextMenuRef = new ContextMenuOverlayRef(this.overlayRef);
    const overlayComponent = this.attachDialogContainer(this.overlayRef, state, contextMenuRef);
  }

  private getOverlayConfig(state: ContextState) {
    const positionStrategy = this.overlay.position()
      .global()
      .left(state.left + 'px')
      .top(state.top + 'px');

    return {
      height: '400px',
      width: '600px',
      positionStrategy: positionStrategy
    };
  }

  private createInjector(state: ContextState, dialogRef: ContextMenuOverlayRef) {
    const injectionTokens = new WeakMap();
    injectionTokens.set(ContextMenuOverlayRef, dialogRef);
    injectionTokens.set(CONTEXT_MENU_OVERLAY_DATA, state);
    return new PortalInjector(this.injector, injectionTokens);
  }

  private attachDialogContainer(overlayRef: OverlayRef, state: ContextState, contextMenuOverlayRef: ContextMenuOverlayRef) {
    const injector = this.createInjector(state, contextMenuOverlayRef);
    const containerPortal = new ComponentPortal(ContextMenuComponent, null, injector);
    const containerRef: ComponentRef<ContextMenuComponent> = overlayRef.attach(containerPortal);
    return containerRef.instance;
  }

  public close() {
    if (this.overlayRef) {
      this.overlayRef.dispose();
    }
  }
}
