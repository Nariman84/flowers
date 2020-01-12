import { TestBed } from '@angular/core/testing';

import { StateFavoritesService } from './state-favorites.service';

describe('StateFavoritesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StateFavoritesService = TestBed.get(StateFavoritesService);
    expect(service).toBeTruthy();
  });
});
