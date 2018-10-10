import { TestBed, inject } from '@angular/core/testing';

import { ContexrService } from './contexr.service';
import {HotkeysService} from 'angular2-hotkeys';

describe('ContexrService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ContexrService,
        {provide: HotkeysService, useClass: HotkeysMockService}
      ]
    });
  });

  it('should be created', inject([ContexrService], (service: ContexrService) => {
    expect(service).toBeTruthy();
  }));
});

export class HotkeysMockService {

}

