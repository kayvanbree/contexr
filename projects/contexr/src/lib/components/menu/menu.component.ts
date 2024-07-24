import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { MenuItem } from '../../types/menu-item';
import { Option } from '../../types/option'
import { CdkMenuModule } from '@angular/cdk/menu';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { ContexrService } from '../../providers/contexr.service';
import { Divider } from '../../types/divider';
import { Submenu } from '../../types/submenu';

@Component({
  selector: 'ctx-menu',
  standalone: true,
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
  imports: [
    CdkMenuModule,
    CommonModule,
    MatDividerModule,
    MatIconModule
  ]
})
export class MenuComponent {
  @Input()
  public items!: MenuItem[];

  @ViewChild('menu', { static: true }) 
  menu!: TemplateRef<any>;

  constructor(private contexr: ContexrService) {}

  /**
   * Call an action and close the context menu
   * @param context
   */
  public act(event: MouseEvent, item: MenuItem): void {
    event.stopPropagation();
    this.contexr.close();

    let option = item as Option;
    option.args ? option.action(option.args()): option.action();
  }

  public anyItemHasIcon() {
    return this.items.find(x => x.icon != null) != null;
  }

  public getHotkey(option: MenuItem) {
    return (option as Option).hotkey;
  }

  public preventPropagation(event: MouseEvent) {
    event.stopPropagation();
  }

  public isOption(option: MenuItem): boolean {
    return (option as Option).action != null;
  }

  public isDivider(item: MenuItem): boolean {
    return (item as Divider).divider != null;
  }

  public isSubmenu(item: MenuItem) {
    return (item as Submenu).items != null && (item as Submenu).items.length > 0;
  }

  public getChildren(item: MenuItem) {
    return (item as Submenu).items;
  }
}
