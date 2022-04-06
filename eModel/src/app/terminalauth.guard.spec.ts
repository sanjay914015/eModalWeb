import { TestBed } from '@angular/core/testing';

import { TerminalauthGuard } from './terminalauth.guard';

describe('TerminalauthGuard', () => {
  let guard: TerminalauthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(TerminalauthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
