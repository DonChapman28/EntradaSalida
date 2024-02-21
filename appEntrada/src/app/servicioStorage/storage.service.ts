import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { RegistroApiService } from '../registroApi/registro-api.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  set(arg0: string, registro: void) {
    throw new Error('Method not implemented.');
  }
  private _storage: Storage | null = null;

  listadoRegistros : any = {
  };
  alertButtons = ['Aceptar'];

  constructor(private storage: Storage,
    private alertController: AlertController,
    private toastController: ToastController,
    private api: RegistroApiService) {
    this.init();
  }

  async init(){
   
    const storage =  await this.storage.create();
    this._storage = storage
  }

  saveRegistro(key: any,rut: any, entrada: any,fecha: Date){
    const data = {
      rut: rut,
      entrada: entrada,
      fecha: fecha
    }
    this.storage.set(key,data);
  }
  
  async setRegistro(user: any, salida: any){
    try{
      const registro = await this.storage.get(user);
      if (registro !== null) {
          registro.salida = salida;
          // Guardar el registro actualizado en el almacenamiento con la misma clave proporcionada
          await this.storage.set(user, registro);
          this.alertaSalida();
          const data = {'rut ': registro.rut,
                        'entrada ': registro.entrada,
                        'salida ': registro.salida}
          this.api.postRegistro(data).subscribe();
          this.storage.remove(registro.rut);
      } else {
        this.errorSalida();
          console.log('No se encontró ningún registro con la clave proporcionada.');
      }
  } catch (error) {
      console.error('Error al actualizar el registro:', error);
 }
}

  async getRegistro(user: any){
    const data = await this.storage.get(user);
    return data;
  } 
  
  async getAllRegistro() {
    let listado: any[] = [];
    await this.storage.forEach((v, k) => { 
      listado.push({ clave: k, valor: v });
    });
    listado.sort((a, b) => {
      if (a.valor.fecha < b.valor.fecha) {
        return 1;
      } else if (a.valor.fecha > b.valor.fecha) {
        return -1;
      } else {
        return 0;
      }
    });
    return listado;
  }

  async errorSalida() {
    const alert = await this.alertController.create({
      header: 'error salida',
      buttons: this.alertButtons
    });
    await alert.present();
  }

  async alertaSalida() {
    const alert = await this.alertController.create({
      header: 'Salida Registrada',
      buttons: this.alertButtons
    });
    await alert.present();
  }

}
