import {NgModule} from '@angular/core';
import {
  MatButtonModule,
  MatSidenavModule,
  MatToolbarModule,
  MatTableModule, MatCardModule
} from '@angular/material';

const materials = [
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatTableModule,
  MatCardModule
];

@NgModule({
  imports: materials,
  exports: materials
})
export class ImportMaterialModule {
}
