import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  install1 = `npm install --save contexr`;

  install2 = `const context: any = [
  {
    text: 'My first context!',
    context: ['my-first-context'],
    action: () => {
      console.log('You just clicked the first context item!');
    },
    hotkey: 'y'
  }
];`;

  install3 = `export function onInitialize(contexr: ContexrService): () => Promise<any> {
  return (): Promise<any> => {
    return new Promise((resolve, reject) => {
      contexr.registerContextMenuItems(context);
      resolve();
    });
  };
}`;
  install4 = `@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
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
export class AppModule { }`;

  install5 = `<!-- Your application code -->
<ctx-context-menu id="ctx"></ctx-context-menu>`;

  install6 = `<table class="table" [ctx]="'my-first-context'">`;

  install7 = `const context: any = [
  // Your other context items
  {
    text: 'Say my name',
    context: ['say-my-name'],
    action: (args: any) => {
      console.log('My name is ' + args.name);
    }
  }
];`;

  install8 = `<div [ctx]="'say-my-name'" [ctxArgs]="{name: 'Henk'}"></div>
<div [ctx]="'say-my-name'" [ctxArgs]="{name: 'Peter'}"></div>`;

  constructor() { }

  ngOnInit() {
  }

}
