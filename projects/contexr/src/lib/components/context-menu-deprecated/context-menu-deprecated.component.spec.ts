import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContextMenuDeprecatedComponent } from './context-menu-deprecated.component';

describe('ContextMenuDeprecatedComponent', () => {
  let component: ContextMenuDeprecatedComponent;
  let fixture: ComponentFixture<ContextMenuDeprecatedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContextMenuDeprecatedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContextMenuDeprecatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
