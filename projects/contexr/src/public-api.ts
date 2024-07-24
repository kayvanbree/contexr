/*
 * Public API Surface of contexr
 */

import { Provider } from '@angular/core';
import { HotkeysService, IHotkeyOptions, HotkeyOptions } from 'angular2-hotkeys';
import { ContexrService } from './lib/providers/contexr.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export * from './lib/types/menu-item';
export * from './lib/types/divider';
export * from './lib/types/submenu';
export * from './lib/types/option';
export * from './lib/directives/context.directive';

export function provideContexr(hotkeyOptions: IHotkeyOptions): Provider[] {
    return [
        ContexrService,
        HotkeysService,
        {provide : HotkeyOptions, useValue : hotkeyOptions},
        { provide: MAT_DIALOG_DATA, useValue: {
            hasBackdrop: false
        }}
    ]
}
