import { OverlayRef } from "@angular/cdk/overlay";

export class ContextMenuDialogRef {
    constructor(private overlayRef: OverlayRef) {}

    close(): void {
        this.overlayRef.dispose;
    }
}