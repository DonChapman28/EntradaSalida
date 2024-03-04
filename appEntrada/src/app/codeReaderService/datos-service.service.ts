import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatosServiceService {
  public tipo: string = '';
  public ndocumento: any;
  public fechaFiltro: any;
  constructor() { }
}
