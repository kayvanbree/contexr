import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContextMenuItemComponent } from './context-menu-item.component';
import { ContexrService } from '../../providers/contexr.service';
import {HotkeysService} from 'angular2-hotkeys';

describe('ContextMenuItemComponent', () => {
  let component: ContextMenuItemComponent;
  let fixture: ComponentFixture<ContextMenuItemComponent>;
  let contexr: ContexrService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ContextMenuItemComponent
      ],
      providers: [
        ContexrService,
        { provide: HotkeysService, useClass: HotkeysMockService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContextMenuItemComponent);
    component = fixture.componentInstance;
    component.person = testItem;
    contexr = fixture.componentRef.injector.get(ContexrService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should perform an action', () => {
    spyOn(contexr, 'close');
    spyOn(component.item, 'action');
    component.act();
    expect(contexr.close).toHaveBeenCalled();
    expect(component.item.action).toHaveBeenCalled();
  });
});

class HotkeysMockService {}

const testItem = {
  text: 'test1',
  context: ['test1-context', 'test2-context'],
  action: () => {
    // Do nothing
  },
  hotkey: 't'
};
