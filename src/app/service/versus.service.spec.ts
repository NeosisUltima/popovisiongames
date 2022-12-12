import { TestBed } from '@angular/core/testing';

import { VersusService } from './versus.service';

describe('VersusService', () => {
  let service: VersusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VersusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
