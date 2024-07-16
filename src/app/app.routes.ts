import { Routes } from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {ExamplePageComponent} from './pages/example-page/example-page.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'example', component: ExamplePageComponent },
    { path: '**', component: HomeComponent }
];
