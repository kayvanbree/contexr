import {NgModule} from '@angular/core';
import {
  MatButtonModule,
  MatSidenavModule,
  MatToolbarModule
} from '@angular/material';

const materials = [
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule
];

@NgModule({
  imports: materials,
  exports: materials
})
export class ImportMaterialModule {
}
