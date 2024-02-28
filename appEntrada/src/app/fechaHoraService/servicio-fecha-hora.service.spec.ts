import { TestBed } from '@angular/core/testing';

import { ServicioFechaHoraService } from './servicio-fecha-hora.service';

describe('ServicioFechaHoraService', () => {
  let service: ServicioFechaHoraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioFechaHoraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
