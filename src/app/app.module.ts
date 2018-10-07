import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {ContexrModule} from '../../projects/contexr/src';
import {SomemoduleModule} from './somemodule/somemodule.module';
import {ContexrService} from 'contexr/lib/providers/contexr.service';

const context = [
  {
    text: 'Sub',
    children: [
      {
        text: 'SubAction',
        context: ['green-square'],
        action: () => { console.log('stuff'); }
      }
    ]
  },
  {
    text: 'Sub0',
    children: [
      {
        text: 'SubAction0',
        context: ['green-square'],
        action: () => { console.log('stuff'); }
      }
    ]
  },
  {
    text: 'Sub1',
    children: [
      {
        text: 'SubAction1',
        context: ['green-square'],
        action: () => { console.log('stuff'); }
      }
    ]
  },
  {
    text: 'Sub2',
    children: [
      {
        text: 'SubAction2',
        context: ['green-square'],
        action: () => { console.log('stuff'); }
      }
    ]
  },
  {
    text: 'Yellow square',
    context: ['yellow-square'],
    action: () => {
      console.log('Yellow');
    },
    hotkey: 'y'
  },
  {
    text: 'Appears on all',
    context: ['all'],
    action: () => {
      console.log('All');
    },
    hotkey: 'a'
  },
  {
    text: 'Blue',
    children: [
      {
        text: 'Blue square',
        context: ['blue-square'],
        action: () => {
          console.log('Blue');
        },
        hotkey: 'b'
      },
      {
        text: 'Subsub',
        children: [
          {
            text: 'Also blue square',
            context: ['blue-square'],
            action: () => {
              console.log('Also blue');
            },
            hotkey: 'ctrl+b'
          }
        ]
      }
    ]
  },
  {
    text: 'One item with a very long name, like really really long',
    context: ['yellow-square'],
    action: () => {
      console.log('long');
    },
    hotkey: 'ctrl+l'
  },
  {
    text: 'Inner context menu item',
    context: ['green-square', 'orange-square'],
    action: () => {
      console.log('This is an inner action!');
    },
    hotkey: 'ctrl+l'
  }
];

export function onInitialize(contexr: ContexrService): () => Promise<any> {
  return (): Promise<any> => {
    return new Promise((resolve, reject) => {
      contexr.registerContextMenuItems(context);
      resolve();
    });
  };
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SomemoduleModule,
    ContexrModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: onInitialize,
      multi: true,
      deps: [ContexrService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
