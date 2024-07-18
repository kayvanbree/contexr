import { Routes } from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import { SimpleMenuExampleComponent as OptionsExampleComponent } from './pages/simple-menu-example/options-example.component';
import { NestedComponentsExampleComponent } from './pages/nested-components-example/nested-components-example.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'options', component: OptionsExampleComponent },
    { path: 'nested', component: NestedComponentsExampleComponent },
    { path: '**', component: HomeComponent }
];
