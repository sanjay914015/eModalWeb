import { TestBed } from '@angular/core/testing';

import { ContainerDataService } from './container-data.service';

describe('ContainerDataService', () => {
  let service: ContainerDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContainerDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
