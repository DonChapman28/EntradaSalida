import { TestBed } from '@angular/core/testing';

import { QrReaderService } from './qr-reader.service';

describe('qrReaderService', () => {
  let service: QrReaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QrReaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
