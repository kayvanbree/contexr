import {APP_INITIALIZER, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ContexrModule, ContextMenuItem} from 'contexr';
import { SomeComponent } from './some/some.component';
import {ContexrService} from 'contexr/lib/providers/contexr.service';

export function onInitialize(contexr: ContexrService): () => Promise<any> {
  return (): Promise<any> => {
    return new Promise((resolve, reject) => {

        contexr.registerContextMenuItem({
          text: 'Some context in library',
          context: ['library-context'],
          action: () => {
            console.log('Doing something in library');
          },
          hotkey: 'l'
        } as any);
        resolve();
    });
  };
}

@NgModule({
  imports: [
    CommonModule,
    ContexrModule
  ],
  declarations: [SomeComponent],
  exports: [
    SomeComponent
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
export class SomemoduleModule { }
