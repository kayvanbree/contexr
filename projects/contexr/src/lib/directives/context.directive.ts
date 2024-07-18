import {Directive, HostListener, Input} from '@angular/core';
import {ContexrService} from '../providers/contexr.service';
import { MenuItem } from '../types/menu-item';
import { v4 as uuidv4 } from 'uuid';

@Directive({
  selector: '[ctx]'
})
export class ContextDirective {

  /**
   * The context menu
   * TODO: Get rid of the ! somehow
   */
  @Input('ctx') 
  menu!: MenuItem[];

  /**
   * The arguments for the action
   */
  @Input('ctxArgs') 
  arguments: any;

  private uuid!: string;

  constructor(private contexr: ContexrService) {
    this.uuid = uuidv4();
  }

  @HostListener('click', ['$event'])
  public onClick(event: MouseEvent) {
    this.contexr.registerMenu(this.uuid, this.menu, this.arguments);
  }

  /**
   * TODO: Typesafe
   * @param event
   */
  @HostListener('contextmenu', ['$event'])
  public onContextMenu(event: any) {
    this.contexr.registerMenu(this.uuid, this.menu, this.arguments);
  }

  ngOnDestroy() {
    this.contexr.unregisterMenu(this.uuid);
  }
}
