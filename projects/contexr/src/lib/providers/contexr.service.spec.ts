import { TestBed, inject } from '@angular/core/testing';

import { ContexrService } from './contexr.service';

describe('ContexrService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContexrService]
    });
  });

  it('should be created', inject([ContexrService], (service: ContexrService) => {
    expect(service).toBeTruthy();
  }));
});
