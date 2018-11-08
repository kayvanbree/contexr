import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleExample1Component } from './simple-example1.component';

describe('SimpleExample1Component', () => {
  let component: SimpleExample1Component;
  let fixture: ComponentFixture<SimpleExample1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleExample1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleExample1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
