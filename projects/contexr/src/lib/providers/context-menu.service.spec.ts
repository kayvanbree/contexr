import { TestBed, inject } from '@angular/core/testing';

import { ContextMenuService } from './context-menu.service';
import {Overlay} from '@angular/cdk/overlay';

class OverlayMock {}
class ContextMenuMockService {}

describe('ContextMenuService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ContextMenuService,
        { provide: Overlay, useClass: OverlayMock },
        { provide: ContextMenuService, useClass: ContextMenuMockService }
      ]
    });
  });

  it('should be created', inject([ContextMenuService], (service: ContextMenuService) => {
    expect(service).toBeTruthy();
  }));
});
