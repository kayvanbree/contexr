import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ContextMenuItemComponent } from './context-menu-item.component';
import { ContexrService } from '../../providers/contexr.service';
import {HotkeysService} from 'angular2-hotkeys';
import {ContextMenuItem} from 'contexr';
import {Overlay} from '@angular/cdk/overlay';
import {ContextMenuService} from '../../providers/context-menu.service';

class HotkeysMockService {}

const testItem = {
  text: 'test1',
  context: ['test1-context', 'test2-context'],
  action: () => {
    // Do nothing
  },
  hotkey: 't'
} as ContextMenuItem;

class OverlayMock {}
class ContextMenuMockService {}

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
        { provide: HotkeysService, useClass: HotkeysMockService },
        { provide: Overlay, useClass: OverlayMock },
        { provide: ContextMenuService, useClass: ContextMenuMockService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContextMenuItemComponent);
    component = fixture.componentInstance;
    component.item = testItem;
    contexr = fixture.componentRef.injector.get(ContexrService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
