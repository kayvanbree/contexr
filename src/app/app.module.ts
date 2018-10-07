import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {ContexrModule} from '../../projects/contexr/src';
import {ContextMenuItem} from '../../projects/contexr/src/lib/types/context-menu-item';\

export function all(): void {
  console.log('Appears on all');
}

export function blueSquare(): void {
  console.log('Blue square');
}

export function alsoBlue(): void {
  console.log('Also blue square');
}

export function long(): void {
  console.log('One item with a very long name');
}


const context: ContextMenuItem[] = [
  {
    text: 'Yellow square', context: ['yellow-square'], action: () => {
      console.log('Yellow');
    }, hotkey: 'y'
  },
  {text: 'Appears on all', context: ['all'], action: all, hotkey: 'a'},
  {text: 'Blue square', context: ['blue-square'], action: blueSquare, hotkey: 'b'},
  {text: 'Also blue square', context: ['blue-square'], action: alsoBlue, hotkey: 'ctrl+b'},
  {text: 'One item with a very long name, like really really long', context: ['blue-square'], action: long, hotkey: 'ctrl+l'},
  {
    text: 'Inner context menu item', context: ['green-square', 'orange-square'], action: () => {
      console.log('This is an inner action!');
    }, hotkey: 'ctrl+l'
  }
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
