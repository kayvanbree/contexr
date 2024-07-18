import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NestedComponentComponent } from './nested-component.component';

describe('NestedComponentComponent', () => {
  let component: NestedComponentComponent;
  let fixture: ComponentFixture<NestedComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NestedComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NestedComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
