import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {ContexrModule} from '../../projects/contexr/src';
import {Context} from '../../projects/contexr/src/lib/types/context';

const context: Context[] = [
  { text: 'Yellow square', context: ['yellow-square'], action: () => { console.log('Yellow square'); }, hotkey: 'y' },
  { text: 'Appears on all', context: ['all'], action: () => { console.log('Appears on all'); }, hotkey: 'a' },
  { text: 'Blue square', context: ['blue-square'], action: () => { console.log('Blue square'); }, hotkey: 'b' },
  { text: 'Also blue square', context: ['blue-square'], action: () => { console.log('Also blue square'); }, hotkey: 'ctrl+b' },
  { text: 'One item with a very long name, like really really long', context: ['blue-square'], action: () => { console.log('One item with a very long name'); }, hotkey: 'ctrl+l' },
  { text: 'Inner context menu item', context: ['green-square', 'orange-square'], action: () => { console.log('Inner context'); }, hotkey: 'ctrl+l' }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ContexrModule.forRoot(context)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
