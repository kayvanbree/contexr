import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ExamplePageComponent} from '../pages/example-page/example-page.component';
import {HomeComponent} from '../pages/home/home.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'example', component: ExamplePageComponent },
  { path: '**', component: HomeComponent }
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
