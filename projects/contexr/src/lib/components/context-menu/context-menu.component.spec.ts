import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContextMenuComponent } from './context-menu.component';
import {ContextMenuItemComponent} from 'contexr/lib/components/context-menu-item/context-menu-item.component';
import {ContexrService} from 'contexr/lib/providers/contexr.service';
import {SubmenuComponent} from 'contexr/lib/components/submenu/submenu.component';
import {ContextState} from 'contexr/lib/types/context-state';
import {Observable, of} from 'rxjs';

describe('ContextMenuComponent', () => {
  let component: ContextMenuComponent;
  let fixture: ComponentFixture<ContextMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ContextMenuComponent,
        ContextMenuItemComponent,
        SubmenuComponent
      ],
      providers: [
        {provide: ContexrService, useClass: ContexrMockService}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContextMenuComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

const testState = {
  open: false,
  context: [],
  top: 0,
  left: 0
};

class ContexrMockService {
  public getContextState(): Observable<ContextState> {
    return of(testState);
  }
}
