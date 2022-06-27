import { TestBed } from '@angular/core/testing';

import { MetamaskConnectionService } from './metamask-connection.service';

describe('MetamaskConnectionService', () => {
  let service: MetamaskConnectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MetamaskConnectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
