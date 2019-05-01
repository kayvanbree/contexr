import { ContextDirective } from './context.directive';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {Component, DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {ContexrService} from '../providers/contexr.service';

@Component({
  template: `<div [ctx]="'context'" [ctxArgs]="{something: 'something'}"></div>`
})
class ContextDirectiveTestComponent {}

class ContexrMockService {
  public addCurrentContext(context: string, args: any) { }
}

describe('ContextDirective', () => {

  let component: ContextDirectiveTestComponent;
  let fixture: ComponentFixture<ContextDirectiveTestComponent>;
  let contexr: ContexrService;
  let element: DebugElement;
  let directive: ContextDirective;
  let directiveElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ContextDirective,
        ContextDirectiveTestComponent
      ],
      providers: [
        {provide: ContexrService, useClass: ContexrMockService}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ContextDirectiveTestComponent);
    contexr = fixture.debugElement.injector.get(ContexrService);
    directiveElement = fixture.debugElement.query(By.directive(ContextDirective));
    directive = directiveElement.injector.get(ContextDirective);
    component = fixture.componentInstance;
    element = fixture.debugElement.query(By.css('div'));
  });

  it('adds context on click', () => {
    spyOn(directive, 'onContextMenu');
    element.triggerEventHandler('click', null);
    expect(directive.onContextMenu).toHaveBeenCalled();
  });

  it('adds context on rightclick', () => {
    spyOn(directive, 'onContextMenu');
    element.triggerEventHandler('contextmenu', null);
    expect(directive.onContextMenu).toHaveBeenCalled();
  });

  it('calls the ContexrService', () => {
    spyOn(contexr, 'addCurrentContext');
    directive.onContextMenu();
    expect(contexr.addCurrentContext).toHaveBeenCalled();
  });
});
