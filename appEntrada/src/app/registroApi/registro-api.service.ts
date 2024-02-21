import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegistroApiService {
  private urlBaseAPI = 'https://registroentradasalida.onrender.com';
  

  constructor(private http: HttpClient) { }

  getRegistro(id: string) {
    const url = this.urlBaseAPI + '/registro?code=' + id; 
    return this.http.get(url);
  }

  postRegistro(data : any) {
    const url = this.urlBaseAPI + '/registro'; 
    return this.http.post<any>(url, data);
  }  

 

}
