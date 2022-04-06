import { TestBed } from '@angular/core/testing';

import { BlurrBgService } from './blurr-bg.service';

describe('BlurrBgService', () => {
  let service: BlurrBgService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlurrBgService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
