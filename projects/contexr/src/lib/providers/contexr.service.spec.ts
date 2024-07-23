import {TestBed, inject} from '@angular/core/testing';
import {ContexrService} from './contexr.service';
import {Hotkey, HotkeysService} from 'angular2-hotkeys';
import { CONTEXT_STATE } from '../types/context-state';
import { Overlay } from '@angular/cdk/overlay';
import { v4 as uuidv4 } from 'uuid';
import { MenuItem } from '../types/menu-item';

class HotkeysServiceMock {
  public add(hotkey: Hotkey | Hotkey[], specificEvent?: string): Hotkey | Hotkey[] {
      return hotkey;
  }
  
  public remove(hotkey?: Hotkey | Hotkey[], specificEvent?: string): Hotkey | Hotkey[] {
    return {} as Hotkey;
  }
}

describe('ContexrService', () => {
  beforeEach(() => {
    let contextState = {
      items: [],
      service: {} as ContexrService
    };

    TestBed.configureTestingModule({
      providers: [
        ContexrService,
        { provide: HotkeysService, useClass: HotkeysServiceMock },
        { provide: CONTEXT_STATE, useValue: contextState },
        Overlay
      ]
    });
    
  });

  it('should be created', inject([ContexrService], (service: ContexrService) => {
    expect(service).toBeTruthy();
  }));

  it('should register hotkeys', inject([ContexrService], (service: ContexrService) => {
    const hotkeysService = TestBed.inject(HotkeysService);
    const spyOnHotkeysServiceAdd = jest.spyOn(hotkeysService, 'add')
      .mockReturnValue(new Hotkey('a', () => { return false; }));

    let uuid = uuidv4();
    let menu: MenuItem[] = [
      {
        label: "Test item",
        action: () => {},
        hotkey: 'a'
      },
      {
        label: "Test item 2",
        action: () => {},
        hotkey: 'b'
      }
    ];

    service.registerMenu(uuid, menu, null);
    expect(spyOnHotkeysServiceAdd).toHaveBeenCalledTimes(2);
  }));

  it('should unregister hotkeys', inject([ContexrService], (service: ContexrService) => {
    const hotkeysService = TestBed.inject(HotkeysService);
    const spyOnHotkeysServiceRemove = jest.spyOn(hotkeysService, 'remove')
      .mockReturnValue(new Hotkey('a', () => { return false; }));

    let uuid = uuidv4();
    let menu: MenuItem[] = [
      {
        label: "Test item",
        action: () => {},
        hotkey: 'a'
      },
      {
        label: "Test item 2",
        action: () => {},
        hotkey: 'b'
      }
    ];

    service.registerMenu(uuid, menu, null);
    service.unregisterMenu(uuid);
    expect(spyOnHotkeysServiceRemove).toHaveBeenCalledTimes(2)
  }));

  it('should unregister hotkeys before registering', inject([ContexrService], (service: ContexrService) => {
    const hotkeysService = TestBed.inject(HotkeysService);

    const spyOnHotkeysServiceRemove = jest.spyOn(hotkeysService, 'remove')
      .mockReturnValue(new Hotkey('a', () => { return false; }));

    let uuid = uuidv4();
    let menu: MenuItem[] = [
      {
        label: "Test item",
        action: () => {},
        hotkey: 'a'
      },
      {
        label: "Test item 2",
        action: () => {},
        hotkey: 'b'
      }
    ];

    service.registerMenu(uuid, menu, null);
    service.registerMenu(uuid, menu, null);
    expect(spyOnHotkeysServiceRemove).toHaveBeenCalledTimes(2);
  }));
});
