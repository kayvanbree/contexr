import { Overlay, OverlayConfig, OverlayRef, PositionStrategy } from '@angular/cdk/overlay';

export class MousePositionStrategy implements PositionStrategy {
  private _overlayRef: OverlayRef;
  attach(overlayRef: OverlayRef): void {
    this._overlayRef = overlayRef;
  }
  apply(): void {
    if (!this._overlayRef.hasAttached()) {
      return;
    }
  }
  dispose(): void { }
}
