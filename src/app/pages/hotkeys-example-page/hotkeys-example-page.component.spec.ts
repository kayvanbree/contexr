import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotkeysExamplePageComponent } from './hotkeys-example-page.component';

describe('HotkeysExamplePageComponent', () => {
  let component: HotkeysExamplePageComponent;
  let fixture: ComponentFixture<HotkeysExamplePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HotkeysExamplePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HotkeysExamplePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
