import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegistroApiService {
  private urlBaseAPI = 'https://registroentradasalida.onrender.com';
  private urlAPI = 'http://localhost:3000/api/datos'; // URL nuevo backend

  constructor(private http: HttpClient) { }

  getRegistro(id: string) {
    const url = this.urlBaseAPI + '/registro?code=' + id; 
    return this.http.get(url);
  }

  postRegistro(data : any) {
    const url = this.urlBaseAPI + '/registro'; 
    return this.http.post<any>(url, data);
  }  

  getRegistroApi() {
    const url = this.urlAPI; 
    return this.http.get(url);
  }

  getRegistroApiFiltro(data: any) {
    const url = this.urlAPI + '/filtro'; 
    return this.http.get(url);
  }

  postRegistroApi(data : any) {
    const url = this.urlAPI; 
    return this.http.post<any>(url, data);
  }  

 

}
