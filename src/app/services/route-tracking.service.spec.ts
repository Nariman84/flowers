import { TestBed } from '@angular/core/testing';

import { RouteTrackingService } from './route-tracking.service';

describe('RouteTrackingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RouteTrackingService = TestBed.get(RouteTrackingService);
    expect(service).toBeTruthy();
  });
});
