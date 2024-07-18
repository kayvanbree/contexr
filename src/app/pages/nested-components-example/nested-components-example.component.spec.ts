import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NestedComponentsExampleComponent } from './nested-components-example.component';

describe('NestedComponentsExampleComponent', () => {
  let component: NestedComponentsExampleComponent;
  let fixture: ComponentFixture<NestedComponentsExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NestedComponentsExampleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NestedComponentsExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
