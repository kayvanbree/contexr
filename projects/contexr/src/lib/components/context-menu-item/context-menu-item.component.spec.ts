import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContextMenuItemComponent } from './context-menu-item.component';
import {ContexrService} from 'contexr/lib/providers/contexr.service';

describe('ContextMenuItemComponent', () => {
  let component: ContextMenuItemComponent;
  let fixture: ComponentFixture<ContextMenuItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ContextMenuItemComponent
      ],
      providers: [
        {provide: ContexrService, useClass: ContexrMockService}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContextMenuItemComponent);
    component = fixture.componentInstance;
    component.item = testItem;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

const testItem = {
  text: 'test1',
  context: ['test1-context', 'test2-context'],
  action: () => {
    console.log('Do something');
  },
  hotkey: 't'
};

class ContexrMockService {}
