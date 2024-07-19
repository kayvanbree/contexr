import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArgumentsExamplePageComponent } from './arguments-example-page.component';

describe('ArgumentsExamplePageComponent', () => {
  let component: ArgumentsExamplePageComponent;
  let fixture: ComponentFixture<ArgumentsExamplePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArgumentsExamplePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArgumentsExamplePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
