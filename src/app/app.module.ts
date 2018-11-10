import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {ContexrModule} from '../../projects/contexr/src';
import {ContexrService} from 'contexr/lib/providers/contexr.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatToolbarModule} from '@angular/material';
import {ImportRoutingModule} from './modules/import-routing.module';
import {ExamplePageComponent} from './pages/example-page/example-page.component';
import {PeopleListModule} from './modules/example-list/people-list-component.module';
import {HomeComponent} from './pages/home/home.component';
import {HighlightModule} from 'ngx-highlightjs';
import { SimpleExample1Component } from './modules/installation-examples/simple-example1/simple-example1.component';

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
    ExamplePageComponent,
    HomeComponent,
    SimpleExample1Component
  ],
  imports: [
    BrowserModule,
    ContexrModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    ImportRoutingModule,
    PeopleListModule,
    HighlightModule.forRoot({ theme: 'agate'})
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
