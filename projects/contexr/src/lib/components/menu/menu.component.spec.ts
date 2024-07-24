import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuComponent } from './menu.component';
import { HotkeysService } from 'angular2-hotkeys';
import { HotkeysServiceMock } from '../../mocks/hotkeys-service.mock';
import { Divider } from '../../types/divider';
import { Option } from '../../types/option';
import { Submenu } from '../../types/submenu';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;
  const mouseEventMock = {
    stopPropagation: () => {}
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuComponent],
      providers: [
        { provide: HotkeysService, useClass: HotkeysServiceMock },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should stop propagation', () => {
    const item = {
      label: 'Test item',
      action: () => {}
    }
    component.items = [item];
    const actionSpy = jest.spyOn(mouseEventMock, 'stopPropagation');
    component.act(mouseEventMock as MouseEvent, item);
    expect(actionSpy).toHaveBeenCalled();
  });

  it('should close contexr on act', () => {
    const item = {
      label: 'Test item',
      action: () => {}
    }
    component.items = [item];
    const actionSpy = jest.spyOn(item, 'action');
    component.act(mouseEventMock as MouseEvent, item);
    expect(actionSpy).toHaveBeenCalled();
  });

  it('should call with arguments', () => {
    const someArgument = "hello";
    const item = {
      label: 'Test item',
      action: (arg: string) => {},
      args: () => someArgument
    }
    component.items = [item];
    const actionSpy = jest.spyOn(item, 'action');
    component.act(mouseEventMock as MouseEvent, item);
    expect(actionSpy).toHaveBeenCalledWith(someArgument);
  });

  it('should return true when an item has an icon', () => {
    const items = [
      {
        label: 'Test item 1',
        icon: 'some-icon',
        action: () => {}
      },
      {
        label: 'Test item 2',
        action: () => {}
      }
    ];
    component.items = items;
    const result = component.anyItemHasIcon();
    expect(result).toBe(true);
  });

  it('should return false when no items have an icon', () => {
    const items = [
      {
        label: 'Test item 1',
        action: () => {}
      },
      {
        label: 'Test item 2',
        action: () => {}
      }
    ];
    component.items = items;
    const result = component.anyItemHasIcon();
    expect(result).toBe(false);
  });

  it('should return true when a submenu has children', () => {
    const item = {
      label: 'Some submenu',
      items: [
        {
          label: 'Some item',
          action: () => {}
        }
      ]
    };
    component.items = [item];
    const result = component.isSubmenu(item);
    expect(result).toBe(true);
  });

  it('should return false when a submenu doesn\'t have children', () => {
    const item = {
      label: 'Some submenu',
      items: []
    };
    component.items = [item];
    const result = component.isSubmenu(item);
    expect(result).toBe(false);
  });

  it('should only recognize options as options', () => {
    const option = {
      label: 'Option',
      action: () => {}
    } as Option;
    expect(component.isOption(option)).toBe(true);

    const divider = {
      divider: true
    } as Divider;
    expect(component.isOption(divider)).toBe(false);

    const submenu = {
      label: 'Submenu',
      items: []
    } as Submenu;
    expect(component.isOption(submenu)).toBe(false);
  });

  it('should only recognize dividers as dividers', () => {
    const option = {
      label: 'Option',
      action: () => {}
    } as Option;
    expect(component.isDivider(option)).toBe(false);

    const divider = {
      divider: true
    } as Divider;
    expect(component.isDivider(divider)).toBe(true);

    const submenu = {
      label: 'Submenu',
      items: []
    } as Submenu;
    expect(component.isDivider(submenu)).toBe(false);
  });

  it('should only recognize submenus with as submenus', () => {
    const option = {
      label: 'Option',
      action: () => {}
    } as Option;
    expect(component.isSubmenu(option)).toBe(false);

    const divider = {
      divider: true
    } as Divider;
    expect(component.isSubmenu(divider)).toBe(false);

    const submenu = {
      label: 'Submenu',
      items: []
    } as Submenu;
    expect(component.isSubmenu(submenu)).toBe(false);

    const submenuWithChildren = {
      label: 'Submenu',
      items: [
        {
          label: 'Option',
          action: () => {}
        }
      ]
    } as Submenu;
    expect(component.isSubmenu(submenuWithChildren)).toBe(true);
  });
});
