import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuComponent } from './menu.component';
import { HotkeysService } from 'angular2-hotkeys';
import { HotkeysServiceMock } from '../../mocks/hotkeys-service.mock';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuComponent],
      providers: [
        { provide: HotkeysService, useClass: HotkeysServiceMock },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
