import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ContextMenuItemComponent } from './context-menu-item.component';
import {ContextMenuItem} from 'contexr';
import {ContextMenuService} from '../../providers/context-menu.service';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';

const testItem = {
  text: 'test1',
  context: ['test1-context', 'test2-context'],
  action: () => {
    // Do nothing
  },
  hotkey: 't'
} as ContextMenuItem;

class ContextMenuMockService {
  public close() {}
}

describe('ContextMenuItemComponent', () => {
  let component: ContextMenuItemComponent;
  let fixture: ComponentFixture<ContextMenuItemComponent>;
  let contextMenuService: ContextMenuService;
  let element: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ContextMenuItemComponent
      ],
      providers: [
        { provide: ContextMenuService, useClass: ContextMenuMockService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContextMenuItemComponent);
    component = fixture.componentInstance;
    component.item = testItem;
    contextMenuService = fixture.componentRef.injector.get(ContextMenuService);
    element = fixture.debugElement.query(By.css('li'));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should act', () => {
    spyOn(component.item, 'action');
    element.triggerEventHandler('click', null);
    expect(component.item.action).toHaveBeenCalled();
  });

  it('should close the menu', () => {
    spyOn(contextMenuService, 'close');
    element.triggerEventHandler('click', null);
    expect(contextMenuService.close).toHaveBeenCalled();
  });
});
