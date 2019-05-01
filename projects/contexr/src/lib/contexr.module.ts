import {APP_INITIALIZER, ModuleWithProviders, NgModule} from '@angular/core';
import {ContextMenuComponent} from './components/context-menu/context-menu.component';
import {CommonModule} from '@angular/common';
import {ContexrService} from './providers/contexr.service';
import {HotkeyModule} from 'angular2-hotkeys';
import {SubmenuComponent} from './components/submenu/submenu.component';
import {ContextMenuItemComponent} from './components/context-menu-item/context-menu-item.component';
import {ContextDirective} from './directives/context.directive';
import {OverlayModule} from '@angular/cdk/overlay';
import {ContextMenuDeprecatedComponent} from './components/context-menu-deprecated/context-menu-deprecated.component';
import {ContextMenuService} from 'contexr/lib/providers/context-menu.service';

/**
 * Bootstrap the ContextMenuService
 */
export function contextMenuServiceFactory(contextMenuService: ContextMenuService) {
  const value = () => contextMenuService.initialize();
  return value;
}

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
    ContextDirective,
    ContextMenuDeprecatedComponent
  ],
  exports: [
    ContextDirective,
    ContextMenuDeprecatedComponent
  ],
  providers: [
    ContexrService,
    ContextMenuService,
    {
      provide: APP_INITIALIZER,
      useFactory: contextMenuServiceFactory,
      deps: [ContextMenuService],
      multi: true
    }
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
