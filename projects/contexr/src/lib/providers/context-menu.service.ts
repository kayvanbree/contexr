    import {ComponentRef, ElementRef, Injectable, Injector} from '@angular/core';
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

      public open(event: MouseEvent, state: ContextState) {
        const overlayConfig = this.getOverlayConfig(event, state);
        this.overlayRef = this.overlay.create(overlayConfig);
        const contextMenuRef = new ContextMenuOverlayRef(this.overlayRef);
        this.attachDialogContainer(this.overlayRef, state, contextMenuRef);
      }

      private getOverlayConfig(event: MouseEvent, state: ContextState) {
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

      private createInjector(state: ContextState, dialogRef: ContextMenuOverlayRef) {
        const injectionTokens = new WeakMap();
        injectionTokens.set(ContextMenuOverlayRef, dialogRef);
        injectionTokens.set(CONTEXT_MENU_OVERLAY_DATA, state);
        return new PortalInjector(this.injector, injectionTokens);
      }

      private attachDialogContainer(overlayRef: OverlayRef, state: ContextState, contextMenuOverlayRef: ContextMenuOverlayRef) {
        const injector = this.createInjector(state, contextMenuOverlayRef);
        const containerPortal = new ComponentPortal(ContextMenuComponent, null, injector);
        overlayRef.attach(containerPortal);
      }

      public close() {
        if (this.overlayRef) {
          this.overlayRef.dispose();
        }
      }
    }
