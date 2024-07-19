import { Routes } from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import { SimpleMenuExampleComponent as OptionsExampleComponent } from './pages/simple-menu-example/options-example-page.component';
import { NestedComponentsExampleComponent } from './pages/nested-components-example/nested-components-example.component';
import { HotkeysExamplePageComponent } from './pages/hotkeys-example-page/hotkeys-example-page.component';
import { ArgumentsExamplePageComponent } from './pages/arguments-example-page/arguments-example-page.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'options', component: OptionsExampleComponent },
    { path: 'hotkeys', component: HotkeysExamplePageComponent },
    { path: 'arguments', component: ArgumentsExamplePageComponent },
    { path: 'nested', component: NestedComponentsExampleComponent },
    { path: '**', component: HomeComponent }
];
