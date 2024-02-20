import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

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
    private toastController: ToastController) {
    this.init();
  }

  async init(){
   
    const storage =  await this.storage.create();
    this._storage = storage
  }

  saveRegistro(key: any, entrada: any,fecha: Date){
    const data = {
      entrada: entrada,
      fecha: fecha
    }
    this.storage.set(key,data);
  }
  
  async setRegistro(user: any, salida: any){
    try{
      // Obtener el registro existente del almacenamiento
      const registro = await this.storage.get(user);

      // Verificar si el registro existe
      if (registro !== null) {
          // Modificar el registro según sea necesario
          registro.salida = salida;

          // Guardar el registro actualizado en el almacenamiento con la misma clave proporcionada
          await this.storage.set(user, registro);
          this.alertaSalida();
          console.log('Registro actualizado:', registro);
      } else {
        this.errorSalida();
          console.log('No se encontró ningún registro con la clave proporcionada.');
      }
  } catch (error) {
      console.error('Error al actualizar el registro:', error);
 }
}

  getRegistro(user: any){
    this.storage.get(user)
    console.log(this.storage.get(user))
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
