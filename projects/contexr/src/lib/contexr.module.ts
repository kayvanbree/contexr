import {ModuleWithProviders, NgModule} from '@angular/core';
import {ContextMenuComponent} from './components/context-menu/context-menu.component';
import {CommonModule} from '@angular/common';
import {ContexrService} from './providers/contexr.service';
import {HotkeyModule} from 'angular2-hotkeys';
import {SubmenuComponent} from './components/submenu/submenu.component';
import {ContextMenuItemComponent} from './components/context-menu-item/context-menu-item.component';
import { ContextDirective } from './directives/context.directive';
import {OverlayModule} from '@angular/cdk/overlay';

@NgModule({
  imports: [
    CommonModule,
    HotkeyModule.forRoot(),
    OverlayModule
  ],
  declarations: [
    ContextMenuComponent,
    SubmenuComponent,
    ContextMenuItemComponent,
    ContextDirective
  ],
  exports: [
    ContextMenuComponent,
    ContextDirective
  ],
  providers: [
    ContexrService
  ],
  entryComponents: [
    ContextMenuComponent
  ]
})
export class ContexrModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ContexrModule,
      providers: [ ContexrService ]
    };
  }
}
