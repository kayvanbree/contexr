import {Directive, HostListener, Input} from '@angular/core';
import {ContexrService} from '../providers/contexr.service';
import {ContextMenuItem} from '../types/context-menu-item';

@Directive({
  selector: '[ctxButton]'
})
export class ContextButtonDirective {
  @Input() ctxButton: ContextMenuItem;

  constructor(private contexr: ContexrService) { }

  @HostListener('click')
  public onClick() {
    event.preventDefault();
    event.stopPropagation();
    this.ctxButton.action(this.ctxButton.args);
  }
}
