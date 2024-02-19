import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init(){
   
    const storage =  await this.storage.create();
    this._storage = storage
  }

  setRegistro(user: any, entrada: any, salida: any){
    const data = {
      entrada: entrada,
      salida: salida
    }
    return(this.storage.set(user,data));
  }

  getRegistro(user: any){
    this.storage.get(user)
  } 
}
