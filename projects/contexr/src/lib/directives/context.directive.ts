import {Directive, HostListener, Input} from '@angular/core';
import {ContexrService} from 'contexr/lib/providers/contexr.service';

@Directive({
  selector: '[ctx]'
})
export class ContextDirective {
  @Input('ctx') ctx: string;
  @Input('ctxArgs') ctxArgs: any;

  constructor(private contexr: ContexrService) {}

  @HostListener('contextmenu', ['$event'])
  public onContextMenu(event) {
    console.log('Adding context: ' + this.ctx + ' with args: ' + this.ctxArgs);
    this.contexr.addCurrentContext(this.ctx, this.ctxArgs);
  }
}
