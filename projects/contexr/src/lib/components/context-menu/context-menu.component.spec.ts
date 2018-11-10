import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ContextMenuComponent} from './context-menu.component';
import {HotkeysService} from 'angular2-hotkeys';
import {ContexrService} from '../../providers/contexr.service';
import {SubmenuComponent} from '../submenu/submenu.component';
import {ContextMenuItemComponent} from '../context-menu-item/context-menu-item.component';

describe('ContextMenuComponent', () => {
  let component: ContextMenuComponent;
  let fixture: ComponentFixture<ContextMenuComponent>;
  let contexr: ContexrService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ContextMenuComponent,
        ContextMenuItemComponent,
        SubmenuComponent
      ],
      providers: [
        ContexrService,
        { provide: HotkeysService, useClass: HotkeysMockService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContextMenuComponent);
    component = fixture.componentInstance;
    contexr = fixture.componentRef.injector.get(ContexrService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // TODO: MAKE THIS TEST BETTER
  it('should close on document click', () => {
    spyOn(contexr, 'close');
    component.onDocumentClick();

    fixture.whenStable().then(() => {
      expect(contexr.close).toHaveBeenCalled();
    });
  });

  it('should open the context menu', () => {
    component.contextState = {
      open: false,
      context: [],
      top: 0,
      left: 0
    };
  });

  it('should react to a new state', () => {
    component.ngOnInit();
    contexr.open(new MouseEvent('contextmenu'));

    fixture.whenStable().then(() => {
      expect(component.open).toBe(true);
    });
  });
});

class HotkeysMockService {}

const testState = {
  open: false,
  context: [],
  top: 0,
  left: 0
};
