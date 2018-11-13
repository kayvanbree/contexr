import {TestBed} from '@angular/core/testing';

import {ContexrService} from './contexr.service';
import {HotkeysService} from 'angular2-hotkeys';
import {Hotkey} from 'angular2-hotkeys/src/hotkey.model';
import {ContextMenuItem} from 'contexr';

describe('ContexrService', () => {
  let contexr: ContexrService;
  let hotkeys: HotkeysService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ContexrService,
        {provide: HotkeysService, useClass: HotkeysMockService}
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    contexr = TestBed.get(ContexrService);
    hotkeys = TestBed.get(HotkeysService);
  });

  it('should be created', () => {
    expect(contexr).toBeTruthy();
  });

  it('should register a hotkey', () => {
      // Arrange
      spyOn(hotkeys, 'add');

      // Act
      contexr.registerContextMenuItem(testItem);

      // Assert
      expect(hotkeys.add).toHaveBeenCalled();
    });

  it('should register multiple hotkeys', () => {
      // Arrange
      spyOn(hotkeys, 'add');

      // Act
      contexr.registerContextMenuItems([{
          text: 'test',
          context: ['test'],
          action: () => {},
          hotkey: 't',
          hasMenu: true
        } as ContextMenuItem,
        {
          text: 'test',
          context: ['test'],
          action: () => {},
          hotkey: 'x',
          hasMenu: true
        } as ContextMenuItem,
        {
          text: 'test',
          context: ['test'],
          action: () => {},
          hasMenu: true
        } as ContextMenuItem
      ]);

      // Assert
      expect(hotkeys.add).toHaveBeenCalledTimes(2);
    });

  it('should not register empty hotkeys', () => {
      // Arrange
      spyOn(hotkeys, 'add');

      // Act
      contexr.registerContextMenuItem({
        text: 'test',
        context: ['test'],
        action: () => {},
        hasMenu: true
      } as ContextMenuItem);

      // Assert
      expect(hotkeys.add).not.toHaveBeenCalled();
    });
});

const testItem = {
  text: 'test',
  context: ['test'],
  action: () => {},
  hotkey: 't',
  hasMenu: true
} as ContextMenuItem;

export class HotkeysMockService {
  public add(hotkey: Hotkey | Hotkey[], specificEvent?: string): Hotkey | Hotkey[] {
    return hotkey;
  }
  public get(combo?: string | string[]): Hotkey | Hotkey[] {
    return null;
  }
}

