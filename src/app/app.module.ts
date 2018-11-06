import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {ContexrModule} from '../../projects/contexr/src';
import {SomemoduleModule} from './somemodule/somemodule.module';
import {ContexrService} from 'contexr/lib/providers/contexr.service';
import { ExampleListComponent } from './example-list/example-list.component';

const context: any = [
  {
    text: 'Add a person',
    context: ['people-list'],
    action: () => { console.log('Adding a person'); }
  },
  {
    text: 'Log message',
    context: ['person'],
    action: (args: any) => { console.log(args.message); }
  },
  {
    text: 'Delete',
    context: ['person'],
    action: (args: any) => { console.log('Deleting ' + args.name); }
  },
  {
    text: 'Say hello',
    context: ['block'],
    action: () => {
      alert('HELLO');
    },
    hotkey: 'h'
  },
  {
    text: 'All',
    context: ['all'],
    action: () => {
      console.log('This appears on all context menus');
    },
    hotkey: 'a'
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
    AppComponent,
    ExampleListComponent
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
