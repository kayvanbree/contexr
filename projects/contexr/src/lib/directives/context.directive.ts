import {Directive, HostListener, Input} from '@angular/core';
import {ContexrService} from '../providers/contexr.service';

@Directive({
  selector: '[ctx]'
})
export class ContextDirective {
  @Input('ctx') ctx: string;
  @Input('ctxArgs') ctxArgs: any;

  constructor(private contexr: ContexrService) {}

  @HostListener('contextmenu')
  @HostListener('click')
  public onContextMenu() {
    this.contexr.addCurrentContext(this);
  }
}
