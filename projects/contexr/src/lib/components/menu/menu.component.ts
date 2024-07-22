import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { MenuItem, Submenu, Option } from '../../types/menu-item';
import { MatMenuModule, MatMenuPanel } from '@angular/material/menu';
import { CdkMenuModule } from '@angular/cdk/menu';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { ContexrService } from '../../providers/contexr.service';

@Component({
  selector: 'ctx-menu',
  standalone: true,
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
  imports: [
    MatMenuModule,
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

  @Input()
  public service!: ContexrService;

  /**
   * Call an action and close the context menu
   * @param context
   */
  public act(event: MouseEvent, item: MenuItem): void {
    event.stopPropagation();

    let option = item as Option;

    option.args ? option.action(option.args()): option.action();

    this.service.close();
  }

  public preventPropagation(event: MouseEvent) {
    event.stopPropagation();
  }

  public isOption(option: MenuItem): boolean {
    return (option as Option).action != null;
  }

  public isSeparator(separator: MenuItem): boolean {
    return separator.label == "separator";
  }

  public hasChildren(item: MenuItem) {
    return (item as Submenu).items != null && (item as Submenu).items.length > 0;
  }

  public getChildren(item: MenuItem) {
    return (item as Submenu).items;
  }
}
