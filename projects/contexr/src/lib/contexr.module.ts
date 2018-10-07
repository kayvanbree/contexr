import {NgModule} from '@angular/core';
import { ContextMenuComponent } from './components/context-menu/context-menu.component';
import {CommonModule} from '@angular/common';
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
export class ContexrModule {}
