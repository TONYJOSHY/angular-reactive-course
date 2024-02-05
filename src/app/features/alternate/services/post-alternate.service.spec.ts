import { TestBed } from '@angular/core/testing';

import { PostAlternateService } from './post-alternate.service';

describe('PostAlternateService', () => {
  let service: PostAlternateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostAlternateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
