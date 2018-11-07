import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {ContexrModule} from '../../projects/contexr/src';
import {ContexrService} from 'contexr/lib/providers/contexr.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatToolbarModule} from '@angular/material';
import { InstallationComponent } from './pages/installation/installation.component';
import {ImportRoutingModule} from './modules/import-routing.module';
import {ExamplePageComponent} from './pages/example-page/example-page.component';
import {PeopleListComponent} from './modules/example-list/people-list-component.module';

const context: any = [
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
    InstallationComponent,
    ExamplePageComponent
  ],
  imports: [
    BrowserModule,
    ContexrModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    ImportRoutingModule,
    PeopleListComponent
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
