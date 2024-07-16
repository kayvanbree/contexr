import {Directive, HostListener, Input} from '@angular/core';
import {ContexrService} from '../providers/contexr.service';

@Directive({
  selector: '[ctx]'
})
export class ContextDirective {
  // TODO: Better way for null thingy (!)?
  @Input('ctx') ctx!: string;
  @Input('ctxArgs') ctxArgs: any;

  constructor(private contexr: ContexrService) {}

  /**
   * TODO: Typesafe
   * @param event
   */
  @HostListener('contextmenu', ['$event'])
  @HostListener('click', ['$event'])
  public onContextMenu(event: any) {
    this.contexr.addCurrentContext(this.ctx, this.ctxArgs);
  }
}
