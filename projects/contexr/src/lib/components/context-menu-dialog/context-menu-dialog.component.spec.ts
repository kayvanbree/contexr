import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContextMenuDialogComponent } from './context-menu-dialog.component';
import { CONTEXT_STATE, ContextState } from '../../types/context-state';
import { ContexrService } from '../../providers/contexr.service';

describe('ContextMenuDialogComponent', () => {
  let component: ContextMenuDialogComponent;
  let fixture: ComponentFixture<ContextMenuDialogComponent>;

  let contextState: ContextState;

  beforeEach(async () => {
    contextState = {
      items: [],
      service: {} as ContexrService
    };

    await TestBed.configureTestingModule({
      imports: [ContextMenuDialogComponent],
      providers: [
        { provide: CONTEXT_STATE, useValue: contextState }
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
