import {TestBed, inject} from '@angular/core/testing';

import {ContexrService} from './contexr.service';
import {HotkeysService} from 'angular2-hotkeys';
import {Hotkey} from 'angular2-hotkeys/src/hotkey.model';
import {ContextMenuItem} from '../components/context-menu-item/context-menu-item.component';

describe('ContexrService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ContexrService,
        {provide: HotkeysService, useClass: HotkeysMockService}
      ]
    });
  });

  it('should be created', inject([ContexrService], (service: ContexrService) => {
    expect(service).toBeTruthy();
  }));

  it('should register a hotkey', inject([ContexrService, HotkeysService],
    (service: ContexrService, hotkeyService: HotkeysService) => {
      // Arrange
      spyOn(hotkeyService, 'add');

      // Act
      service.registerContextMenuItem(testItem);

      // Assert
      expect(hotkeyService.add).toHaveBeenCalled();
    }));

  it('should register multiple hotkeys', inject([ContexrService, HotkeysService],
    (service: ContexrService, hotkeyService: HotkeysService) => {
      // Arrange
      spyOn(hotkeyService, 'add');

      // Act
      service.registerContextMenuItems([{
          text: 'test',
          context: ['test'],
          action: () => {},
          hotkey: 't'
        } as ContextMenuItem,
        {
          text: 'test',
          context: ['test'],
          action: () => {},
          hotkey: 'x'
        } as ContextMenuItem,
        {
          text: 'test',
          context: ['test'],
          action: () => {}
        } as ContextMenuItem
      ]);

      // Assert
      expect(hotkeyService.add).toHaveBeenCalledTimes(2);
    }));

  it('should not register empty hotkeys', inject([ContexrService, HotkeysService],
    (service: ContexrService, hotkeyService: HotkeysService) => {
      // Arrange
      spyOn(hotkeyService, 'add');

      // Act
      service.registerContextMenuItem({
        text: 'test',
        context: ['test'],
        action: () => {}
      } as ContextMenuItem);

      // Assert
      expect(hotkeyService.add).not.toHaveBeenCalled();
    }));
});

const testItem = {
  text: 'test',
  context: ['test'],
  action: () => {},
  hotkey: 't'
} as ContextMenuItem;

export class HotkeysMockService {
  public add(hotkey: Hotkey | Hotkey[], specificEvent?: string): Hotkey | Hotkey[] {
    return hotkey;
  }
  public get(hotkey: Hotkey | Hotkey[], specificEvent?: string): Hotkey | Hotkey[] {
    return null;
  }
}

