import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {CONTEXT_MENU_OVERLAY_DATA, ContextMenuComponent} from './context-menu.component';
import {SubmenuComponent} from '../submenu/submenu.component';
import {ContextMenuItemComponent} from '../context-menu-item/context-menu-item.component';
import {ContextState} from '../../types/context-state';
import {ContextMenuItem} from '../../types/context-menu-item';
import {Submenu} from '../../types/submenu';

const CONTEXT_MENU_MOCK_DATA: ContextState = {

};

describe('ContextMenuComponent', () => {
  let component: ContextMenuComponent;
  let fixture: ComponentFixture<ContextMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ContextMenuComponent,
        ContextMenuItemComponent,
        SubmenuComponent
      ],
      providers: [
        { provide: CONTEXT_MENU_OVERLAY_DATA, useValue: CONTEXT_MENU_MOCK_DATA }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContextMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should recognize context items', () => {
    const testItem: ContextMenuItem = {
      context: ['context'],
      text: 'Context',
      action: () => {},
      hotkey: 'h',
      args: { argument: 'hello' }
    };
    const testSubmenu: Submenu = {
      text: 'Submenu',
      children: [testItem]
    };

    const resultItem = component.isAction(testItem);
    const resultSubmenu = component.isAction(testSubmenu);

    expect(resultItem).toBe(true);
    expect(resultSubmenu).toBe(false);
  });

  it('should recognize submenus', () => {
    const testItem: ContextMenuItem = {
      context: ['context'],
      text: 'Context',
      action: () => {},
      hotkey: 'h',
      args: { argument: 'hello' }
    };
    const testSubmenu: Submenu = {
      text: 'Submenu',
      children: [testItem]
    };

    const resultItem = component.isSubmenu(testItem);
    const resultSubmenu = component.isSubmenu(testSubmenu);

    expect(resultItem).toBe(false);
    expect(resultSubmenu).toBe(true);
  });

  it('should not handle items with hideMenu=true', () => {
    const testItem: ContextMenuItem = {
      context: ['context'],
      text: 'Context',
      action: () => {},
      hotkey: 'h',
      args: { argument: 'hello' },
      hideMenu: true
    };

    const resultItem = component.isAction(testItem);
    const resultSub = component.isSubmenu(testItem);

    expect(resultItem).toBe(false);
    expect(resultSub).toBe(false);
  });
});
