import {Directive, HostListener, Input} from '@angular/core';
import {ContexrService} from 'contexr/lib/providers/contexr.service';

@Directive({
  selector: '[ctx]'
})
export class ContextDirective {
  @Input('ctx') ctx: string;
  @Input('ctxArgs') ctxArgs: any;
  id: Symbol;

  constructor(private contexr: ContexrService) {
    this.id = Symbol();
  }

  @HostListener('contextmenu', ['$event'])
  @HostListener('click', ['$event'])
  public onContextMenu(event) {
    this.contexr.addCurrentContext(this.ctx, this.ctxArgs, this.id);
  }
}
