import { Component, HostListener, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from "@angular/material/menu";
import { CONTEXT_STATE, ContextState } from '../../types/context-state';
import { MenuComponent } from '../menu/menu.component';
import { CdkMenuTrigger } from '@angular/cdk/menu';

@Component({
  selector: 'app-context-menu-dialog',
  standalone: true,
  templateUrl: './context-menu-dialog.component.html',
  styleUrl: './context-menu-dialog.component.css',
  imports: [
    CommonModule,
    MatMenuModule,
    MenuComponent,
    CdkMenuTrigger
  ]
})
export class ContextMenuDialogComponent {
  constructor(@Inject(CONTEXT_STATE) public contextState: ContextState) {
    console.debug("Opened context menu");
  }

  @HostListener('document:click', ['$event'])
  public closeOnClick(event: MouseEvent) {
    this.contextState.service.close();
  }
}
