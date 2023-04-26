import { TestBed } from '@angular/core/testing';

import { ReceipeService } from './receipe.service';

describe('ReceipeService', () => {
  let service: ReceipeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReceipeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
