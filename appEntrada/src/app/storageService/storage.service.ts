import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { RegistroApiService } from '../registroService/registro-api.service';
import { AlertService } from '../alertaService/alert.service';
import { DatosServiceService } from '../codeReaderService/datos-service.service';
import { ServicioFechaHoraService } from '../fechaHoraService/servicio-fecha-hora.service';

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
    private api: RegistroApiService,
    private alert: AlertService,
    private datos: DatosServiceService,
    private fecha: ServicioFechaHoraService) {
    this.init();
  }

  async init(){
   
    const storage =  await this.storage.create();
    this._storage = storage
  }

  saveRegistro(key: any,rut: any,tipo:any ,entrada: any,fecha: Date){
    const data = {
      rut: rut,
      tipo: tipo,
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
          this.alert.alertaSalida();
          const data = {'rut': registro.rut,
                        'entrada': registro.entrada,
                        'salida': registro.salida,
                        'tipo': registro.tipo,
                        'nDocumento': this.datos.ndocumento};
                        console.log(this.datos.ndocumento);
         /*  this.api.postRegistro(data).subscribe(); */
          this.api.postRegistroApi(data).subscribe();
          this.datos.ndocumento = null;
          this.storage.remove(registro.rut);
      } else {
        this.alert.errorSalida();
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

  async getRegistrosPorTipo(tipo: string) {
    let listado: any[] = [];
    await this.storage.forEach((v: any, k: string) => {
      if (v.tipo === tipo) {
        listado.push({ clave: k, valor: v });
      }
    });
  
    // Ordenar el listado por la fecha en orden descendente
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

}
