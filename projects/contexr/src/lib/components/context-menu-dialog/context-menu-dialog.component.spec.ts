import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContextMenuDialogComponent } from './context-menu-dialog.component';
import { CONTEXT_STATE } from '../../types/context-state';
import { MenuItem } from '../../types/menu-item';
import { HotkeysServiceMock } from '../../mocks/hotkeys-service.mock';
import { HotkeysService } from 'angular2-hotkeys';
import { ContexrService } from '../../providers/contexr.service';
import { ContexrServiceMock } from '../../mocks/contexr-service.mock';

describe('ContextMenuDialogComponent', () => {
  let component: ContextMenuDialogComponent;
  let fixture: ComponentFixture<ContextMenuDialogComponent>;
  let contexrMock = new ContexrServiceMock();

  beforeEach(async () => {
    let items: MenuItem[] = [];

    await TestBed.configureTestingModule({
      imports: [ContextMenuDialogComponent],
      providers: [
        { provide: HotkeysService, useClass: HotkeysServiceMock },
        { provide: CONTEXT_STATE, useValue: items },
        { provide: ContexrService, useValue: contexrMock }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContextMenuDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should trigger menu to open', () => {
    const menuTriggerSpy = jest.spyOn(component.menuTrigger, 'open');
    component.ngAfterContentChecked();
    expect(menuTriggerSpy).toHaveBeenCalled();
  });

  it('should close menu on document click', () => {
    const contexrSpy = jest.spyOn(contexrMock, 'close');
    const mouseEvent = { clientX: 0, clientY: 0 } as MouseEvent;
    component.closeOnClick(mouseEvent);
    expect(contexrSpy).toHaveBeenCalled();
  });
});
