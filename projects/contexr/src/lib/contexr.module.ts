import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ContexrService} from './providers/contexr.service';
import {HotkeyModule} from 'angular2-hotkeys';

import {ContextMenuComponent} from './components/context-menu/context-menu.component';
import {SubmenuComponent} from './components/submenu/submenu.component';
import {OptionComponent} from './components/option-component/option.component';

import { ContextDirective } from './directives/context.directive';

@NgModule({
  imports: [
    CommonModule,
    HotkeyModule.forRoot()
  ],
  declarations: [
    ContextMenuComponent,
    SubmenuComponent,
    OptionComponent,
    ContextDirective
  ],
  exports: [
    ContextMenuComponent,
    ContextDirective
  ],
  providers: [
    ContexrService
  ]
})
export class ContexrModule {
  constructor(@Optional() @SkipSelf() parentModule?: ContexrModule) {
    if (parentModule) {
      throw new Error("ContexrModule is already loaded. Import it in the AppModule only");
    }
  }

  static forRoot(): ModuleWithProviders<ContexrModule> {
    return {
      ngModule: ContexrModule,
      providers: [ ContexrService ]
    };
  }
}
