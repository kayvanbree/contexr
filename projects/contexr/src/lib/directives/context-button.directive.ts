import {Directive, ElementRef, HostListener, Input, OnChanges, Renderer2} from '@angular/core';
import {ContextMenuItem} from '../types/context-menu-item';

@Directive({
  selector: '[ctxButton]'
})
export class ContextButtonDirective implements OnChanges {
  @Input() public ctxButton: ContextMenuItem;

  @HostListener('click')
  public onClick(): void {
    event.preventDefault();
    event.stopPropagation();
    this.ctxButton.action(this.ctxButton.args);
  }

  constructor(private element: ElementRef, private renderer: Renderer2) {}

  public ngOnChanges(): void {
    if (this.ctxButton.inContext) {
      this.renderer.removeAttribute(this.element.nativeElement, 'disabled');
    } else {
      this.renderer.setAttribute(this.element.nativeElement, 'disabled', 'true');
    }
    this.renderer.setAttribute(this.element.nativeElement, 'title', this.ctxButton.text);
  }
}
