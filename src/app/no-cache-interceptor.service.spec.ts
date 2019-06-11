import { TestBed } from '@angular/core/testing';

import { NoCacheInterceptorService } from './no-cache-interceptor.service';

describe('NoCacheInterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NoCacheInterceptorService = TestBed.get(NoCacheInterceptorService);
    expect(service).toBeTruthy();
  });
});
