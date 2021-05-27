import { TestBed } from '@angular/core/testing';

import { UserPageGuardGuard } from './user-page-guard.guard';

describe('UserPageGuardGuard', () => {
  let guard: UserPageGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UserPageGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
