import {NgModule} from '@angular/core';
import { ContextMenuComponent } from './components/context-menu/context-menu.component';
import {CommonModule} from '@angular/common';
import {ContexrService} from './providers/contexr.service';
import {HotkeyModule} from 'angular2-hotkeys';
import { SubmenuComponent } from './components/submenu/submenu.component';
import { ContextMenuItemComponent } from './components/context-menu-item/context-menu-item.component';

@NgModule({
  imports: [
    CommonModule,
    HotkeyModule.forRoot()
  ],
  declarations: [
    ContextMenuComponent,
    SubmenuComponent,
    ContextMenuItemComponent
  ],
  exports: [
    ContextMenuComponent
  ],
  providers: [
    ContexrService
  ]
})
export class ContexrModule {}
