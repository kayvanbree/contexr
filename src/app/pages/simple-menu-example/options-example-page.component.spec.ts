import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleMenuExampleComponent } from './options-example-page.component';

describe('SimpleMenuExampleComponent', () => {
  let component: SimpleMenuExampleComponent;
  let fixture: ComponentFixture<SimpleMenuExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimpleMenuExampleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimpleMenuExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
