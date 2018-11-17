import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListWithContextComponent } from './list-with-context.component';

describe('ListWithContextComponent', () => {
  let component: ListWithContextComponent;
  let fixture: ComponentFixture<ListWithContextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListWithContextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListWithContextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
