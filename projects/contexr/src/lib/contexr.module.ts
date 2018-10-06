import {ModuleWithProviders, NgModule} from '@angular/core';
import { ContextMenuComponent } from './components/context-menu/context-menu.component';
import {CommonModule} from '@angular/common';
import {ContextMenuItem} from './types/context-menu-item';
import {ContexrService} from './providers/contexr.service';
import {HotkeyModule} from 'angular2-hotkeys';

@NgModule({
  imports: [
    CommonModule,
    HotkeyModule.forRoot()
  ],
  declarations: [
    ContextMenuComponent
  ],
  exports: [
    ContextMenuComponent
  ],
  providers: [
    ContexrService
  ]
})
export class ContexrModule {
  static forRoot(context: ContextMenuItem[]): ModuleWithProviders {
    return {
      ngModule: ContexrModule,
      providers: [ContexrService, { provide: 'context', useValue: context }]
    };
  }
}
