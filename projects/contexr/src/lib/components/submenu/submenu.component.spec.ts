import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmenuComponent } from './submenu.component';
import {OptionComponent} from '../option-component/option.component';
import {HotkeysService} from 'angular2-hotkeys';

describe('SubmenuComponent', () => {
  let component: SubmenuComponent;
  let fixture: ComponentFixture<SubmenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SubmenuComponent,
        OptionComponent
      ],
      providers: [
        { provide: HotkeysService, useClass: HotkeysMockService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmenuComponent);
    component = fixture.componentInstance;
    component.item = testSubmenu;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should react to changes', () => {
    component.item = {
      text: 'sub1',
      children: [
        { text: 'subitem1', context: ['test'], action: () => {}, hotkey: 't'},
        { text: 'anothersub', context: ['text'], action: () => {}, hotkey: 'l'}
      ]
    } as any;
    component.ngOnChanges();
    expect(component.subMenuStyle).not.toBeNull();
  });
});

const testSubmenu = {
  text: 'sub1',
  children: [
    { text: 'subitem1', context: ['test'], action: () => {}, hotkey: 't'}
  ]
};

class HotkeysMockService {}
