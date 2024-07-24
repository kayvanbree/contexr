import { Component, HostListener, Inject, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CONTEXT_STATE } from '../../types/context-state';
import { MenuComponent } from '../menu/menu.component';
import { CdkMenuModule, CdkMenuTrigger } from '@angular/cdk/menu';
import { ContexrService } from '../../providers/contexr.service';
import { MenuItem } from '../../types/menu-item';

@Component({
  selector: 'app-context-menu-dialog',
  standalone: true,
  templateUrl: './context-menu-dialog.component.html',
  styleUrl: './context-menu-dialog.component.css',
  imports: [
    CommonModule,
    MenuComponent,
    CdkMenuModule,
    CdkMenuTrigger
  ]
})
export class ContextMenuDialogComponent {
  @ViewChild('menuComponent', { static: true }) 
  menu!: TemplateRef<MenuComponent>;

  @ViewChild(CdkMenuTrigger) 
  menuTrigger!: CdkMenuTrigger;
  
  constructor(@Inject(CONTEXT_STATE) public items: MenuItem[], private contexr: ContexrService) {}

  ngAfterContentChecked() {
    if (this.menuTrigger) {
      this.menuTrigger.open();
    }
  }

  @HostListener('document:click', ['$event'])
  public closeOnClick(event: MouseEvent) {
    this.contexr.close();
  }
}
