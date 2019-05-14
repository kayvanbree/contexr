import {Directive, ElementRef, HostListener, Input, OnChanges, Renderer2} from '@angular/core';
import {ContextMenuItem} from '../types/context-menu-item';
import {ContexrService} from '../providers/contexr.service';

@Directive({
  selector: '[ctxButton]'
})
export class ContextButtonDirective implements OnChanges {
  @Input() public ctxButton: ContextMenuItem;

  @HostListener('click')
  public onClick(): void {
    event.preventDefault();
    event.stopPropagation();
    this.contexr.act(this.ctxButton);
  }

  constructor(
    private element: ElementRef,
    private renderer: Renderer2,
    private contexr: ContexrService
  ) {}

  public ngOnChanges(): void {
    if (this.ctxButton.inContext) {
      this.renderer.removeAttribute(this.element.nativeElement, 'disabled');
    } else {
      this.renderer.setAttribute(this.element.nativeElement, 'disabled', 'true');
    }
    this.renderer.setAttribute(this.element.nativeElement, 'title', this.ctxButton.text);
  }
}
