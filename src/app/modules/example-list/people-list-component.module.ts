import {APP_INITIALIZER, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ContexrModule} from '../../../../projects/contexr/src/public-api';
import {ContexrService} from '../../../../projects/contexr/src/public-api';
import {ExampleListComponent} from './example-list/example-list.component';

const context = [
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
  imports: [
    CommonModule,
    ContexrModule
  ],
  declarations: [
    ExampleListComponent
  ],
  exports: [
    ExampleListComponent
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: onInitialize,
      multi: true,
      deps: [ContexrService]
    }
  ]
})
export class PeopleListModule { }
