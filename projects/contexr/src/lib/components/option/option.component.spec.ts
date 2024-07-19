import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { OptionComponent } from './option.component';
import { ContexrService } from '../../providers/contexr.service';
import {HotkeysService} from 'angular2-hotkeys';
import {ContextMenuItem} from 'contexr';

class HotkeysMockService {}

const testItem = {
  text: 'test1',
  context: ['test1-context', 'test2-context'],
  action: () => {
    // Do nothing
  },
  hotkey: 't'
} as ContextMenuItem;

describe('ContextMenuItemComponent', () => {
  let component: OptionComponent;
  let fixture: ComponentFixture<OptionComponent>;
  let contexr: ContexrService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        OptionComponent
      ],
      providers: [
        ContexrService,
        { provide: HotkeysService, useClass: HotkeysMockService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionComponent);
    component = fixture.componentInstance;
    component.item = testItem;
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
