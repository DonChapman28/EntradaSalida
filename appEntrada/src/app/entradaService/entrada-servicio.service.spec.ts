import { TestBed } from '@angular/core/testing';

import { EntradaServicioService } from './entrada-servicio.service';

describe('EntradaServicioService', () => {
  let service: EntradaServicioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntradaServicioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
