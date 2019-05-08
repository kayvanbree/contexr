import {Directive, HostListener, Input} from '@angular/core';
import {ContextMenuItem} from '../types/context-menu-item';

@Directive({
  selector: '[ctxButton]'
})
export class ContextButtonDirective {
  @Input() ctxButton: ContextMenuItem;

  @HostListener('click')
  public onClick() {
    event.preventDefault();
    event.stopPropagation();
    this.ctxButton.action(this.ctxButton.args);
  }
}
