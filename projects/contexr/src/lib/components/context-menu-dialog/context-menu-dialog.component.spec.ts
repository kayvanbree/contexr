import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContextMenuDialogComponent } from './context-menu-dialog.component';
import { CONTEXT_STATE } from '../../types/context-state';
import { MenuItem } from '../../types/menu-item';
import { HotkeysServiceMock } from '../../mocks/hotkeys-service.mock';
import { HotkeysService } from 'angular2-hotkeys';

describe('ContextMenuDialogComponent', () => {
  let component: ContextMenuDialogComponent;
  let fixture: ComponentFixture<ContextMenuDialogComponent>;

  beforeEach(async () => {
    let items: MenuItem[] = [];

    await TestBed.configureTestingModule({
      imports: [ContextMenuDialogComponent],
      providers: [
        { provide: HotkeysService, useClass: HotkeysServiceMock },
        { provide: CONTEXT_STATE, useValue: items }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContextMenuDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
