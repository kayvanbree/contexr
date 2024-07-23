import {TestBed, inject} from '@angular/core/testing';
import {ContexrService} from './contexr.service';
import {HotkeysService} from 'angular2-hotkeys';
import { HotkeysServiceMock } from '../../helper/hotkeys-service.mock';
import { CONTEXT_STATE, ContextState } from '../types/context-state';

describe('ContexrService', () => {
  let contextState: ContextState;

  const testItem = {
    text: 'test',
    context: ['test'],
    action: () => {},
    hotkey: 't'
  };

  beforeEach(() => {
    contextState = {
      items: [],
      service: {} as ContexrService
    };

    TestBed.configureTestingModule({
      providers: [
        ContexrService,
        { provide: HotkeysService, useClass: HotkeysServiceMock },
        { provide: CONTEXT_STATE, useValue: contextState }
      ]
    });
  });

  it('should be created', inject([ContexrService], (service: ContexrService) => {
    expect(service).toBeTruthy();
  }));
});
