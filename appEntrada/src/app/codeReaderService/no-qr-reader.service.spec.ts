import { TestBed } from '@angular/core/testing';

import { NoQrReaderService } from './no-qr-reader.service';

describe('NoQrReaderService', () => {
  let service: NoQrReaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NoQrReaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
