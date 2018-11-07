import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {InstallationComponent} from '../pages/installation/installation.component';
import {ExamplePageComponent} from '../pages/example-page/example-page.component';

const appRoutes: Routes = [
  { path: 'installation', component: InstallationComponent },
  { path: 'example', component: ExamplePageComponent },
  { path: '**', component: InstallationComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ImportRoutingModule { }
