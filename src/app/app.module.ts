import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import {ContexrModule} from '../../projects/contexr/src/public-api';
import {ContexrService} from '../../projects/contexr/src/public-api';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {PeopleListModule} from './modules/example-list/people-list-component.module';
import {SimpleExample1Component} from './modules/installation-examples/simple-example1/simple-example1.component';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import { CommonModule } from '@angular/common';

const context: any = [
  {
    text: 'My first context!',
    context: ['my-first-context'],
    action: () => {
      console.log('You just clicked the first context item!');
    },
    hotkey: 'y'
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
    text: 'Say my name',
    context: ['say-my-name'],
    action: (args: any) => {
      alert('My name is ' + args.name);
    }
  },
  {
    text: 'All',
    context: ['all'],
    action: () => {
      console.log('This appears on all context menus');
    }
  }
];

export function onInitialize(contexr: ContexrService): () => Promise<any> {
  return (): Promise<any> => {
    return new Promise((resolve, reject) => {
      contexr.registerContextMenuItems(context);
    });
  };
}

@NgModule({
  declarations: [
    SimpleExample1Component
  ],
  imports: [
    BrowserModule,
    ContexrModule,
    CommonModule,
    BrowserAnimationsModule,
    PeopleListModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatTableModule,
    MatCardModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: onInitialize,
      multi: true,
      deps: [ContexrService]
    }
  ],
})
export class AppModule {
}
