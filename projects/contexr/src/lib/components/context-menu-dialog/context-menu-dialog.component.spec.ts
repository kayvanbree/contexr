import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContextMenuDialogComponent } from './context-menu-dialog.component';

describe('ContextMenuDialogComponent', () => {
  let component: ContextMenuDialogComponent;
  let fixture: ComponentFixture<ContextMenuDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContextMenuDialogComponent]
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
