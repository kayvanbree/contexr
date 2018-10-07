import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContextMenuItemComponent } from './context-menu-item.component';

describe('ContextMenuItemComponent', () => {
  let component: ContextMenuItemComponent;
  let fixture: ComponentFixture<ContextMenuItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContextMenuItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContextMenuItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
