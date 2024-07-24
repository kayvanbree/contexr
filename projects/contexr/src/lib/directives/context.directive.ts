import {Directive, HostListener, Input} from '@angular/core';
import {ContexrService} from '../providers/contexr.service';
import { MenuItem } from '../types/menu-item';
import { v4 as uuidv4 } from 'uuid';

@Directive({
  selector: '[ctx]',
  standalone: true
})
export class ContextDirective {

  /**
   * The context menu
   * TODO: Get rid of the ! somehow
   */
  @Input('ctx') 
  menu!: MenuItem[];

  private uuid!: string;

  constructor(private contexr: ContexrService) {
    this.uuid = uuidv4();
  }

  ngOnInit() {
    this.contexr.registerMenu(this.uuid, this.menu);
  }

  /**
   * TODO: Typesafe
   * @param event
   */
  @HostListener('contextmenu', ['$event'])
  public onContextMenu(event: any) {
    this.contexr.open(event);
  }

  ngOnDestroy() {
    this.contexr.unregisterMenu(this.uuid);
  }
}
