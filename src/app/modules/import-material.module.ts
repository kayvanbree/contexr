import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';

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
