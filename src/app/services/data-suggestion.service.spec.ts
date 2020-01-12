import { TestBed } from '@angular/core/testing';

import { DataSuggestionService } from './data-suggestion.service';

describe('DataSuggestionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataSuggestionService = TestBed.get(DataSuggestionService);
    expect(service).toBeTruthy();
  });
});
