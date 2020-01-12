import { TestBed } from '@angular/core/testing';

import { OrdersResolveService } from './orders-resolve.service';

describe('OrdersResolveService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OrdersResolveService = TestBed.get(OrdersResolveService);
    expect(service).toBeTruthy();
  });
});
