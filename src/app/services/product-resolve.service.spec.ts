import { TestBed } from '@angular/core/testing';

import { ProductResolveService } from './product-resolve.service';

describe('ProductResolveService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductResolveService = TestBed.get(ProductResolveService);
    expect(service).toBeTruthy();
  });
});
