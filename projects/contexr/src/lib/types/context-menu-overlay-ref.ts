import {OverlayRef} from '@angular/cdk/overlay';

export class ContextMenuOverlayRef {
  constructor(private overlayRef: OverlayRef) {}

  close(): void {
    this.overlayRef.dispose();
  }
}
