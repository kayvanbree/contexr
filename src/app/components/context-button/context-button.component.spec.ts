import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContextButtonComponent } from './context-button.component';

describe('ContextButtonComponent', () => {
  let component: ContextButtonComponent;
  let fixture: ComponentFixture<ContextButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContextButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContextButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
