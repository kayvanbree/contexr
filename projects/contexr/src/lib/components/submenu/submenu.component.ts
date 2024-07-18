import {Component, ElementRef, Input, OnChanges} from '@angular/core';
import { MenuItem, Option, Submenu } from '../../types/menu-item';

@Component({
  selector: 'ctx-submenu',
  templateUrl: './submenu.component.html',
  styleUrls: ['./submenu.component.css']
})
export class SubmenuComponent implements OnChanges {

  @Input() set item(item: MenuItem) {
    this.submenu = item as Submenu;
  }
  public submenu!: Submenu;

  constructor(private element: ElementRef) { }

  public subMenuStyle = {};

  public ngOnChanges(): void {
    const rect = this.element.nativeElement.getBoundingClientRect();
    this.subMenuStyle = {
      'left': 214 + 'px',
      'top': rect.offsetHeight + 'px'
    };
  }

  /**
   * Check if this is an option
   * @param option
   * @returns
   */
  public isOption(option: MenuItem): boolean {
    return (option as Option).action != null;
  }

  /**
   * Is this context menu entry a submenu?
   * @param submenu
   */
  public isSubmenu(submenu: MenuItem): boolean {
    return (submenu as Submenu).items != null;
  }

  /**
   * Is this entry a separator?
   * @param separator 
   * @returns 
   */
  public isSeparator(separator: MenuItem): boolean {
    return separator.label == "separator";
  }
}
