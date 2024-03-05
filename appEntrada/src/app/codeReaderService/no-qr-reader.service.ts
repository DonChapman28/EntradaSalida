import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { BrowserQRCodeReader, Result, VideoInputDevice } from '@zxing/library';
import { Router } from '@angular/router';
import { ServicioFechaHoraService } from '../fechaHoraService/servicio-fecha-hora.service';
import { Storage } from '@ionic/storage-angular';
import { StorageService } from '../storageService/storage.service';
import { RegistroApiService } from '../registroService/registro-api.service';
import { AlertService } from '../alertaService/alert.service';
import { DatosServiceService } from './datos-service.service';
@Injectable({
  providedIn: 'root'
})
export class NoQrReaderService {
  alertButtons = ['Aceptar'];
  codigo: any;
  fechaEntrada: any;
  fechaSalida: any;
  fechaRegistro: any;
  tipo: any;
  constructor(private router: Router,
    private activated: ActivatedRoute,
    private alertController: AlertController,
    private toastController: ToastController,
    private fechaHora: ServicioFechaHoraService,
    private storage: StorageService,
    private api:RegistroApiService,
    private alert : AlertService,
    private dato : DatosServiceService) { }

async entrada(rut:any){
this.fechaEntrada = this.fechaHora.getFechaHora();
this.fechaRegistro = this.fechaHora.getFecha();


this.codigo = rut;

if (this.codigo !== null){
console.log("Número de RUT (o RUN):", rut);
const datos = {'id: ':this.codigo,
'rut: ': this.codigo,
'entrada: ': this.fechaEntrada,
'salida: ': this.fechaRegistro,
'tipo: ': this.dato.tipo}
console.log(datos)
this.storage.saveRegistro(this.codigo,this.codigo,this.dato.tipo,this.fechaEntrada,this.fechaRegistro)
console.log('enviado');
this.alert.alertaEntrada();

} else {
console.log("Número de RUT (o RUN) no encontrado en la URL.");
this.alert.errorCarnet();}};
                                                                                                                                  
//salir
salida(rut:any){
this.fechaSalida = this.fechaHora.getFechaHora();


this.codigo = rut;
if(this.codigo !== ''){
console.log("Número de RUT (o RUN):", rut);
this.storage.setRegistro(this.codigo,this.fechaSalida);
console.log('enviado');                
}
else{
  console.log("Número de RUT (o RUN) no encontrado en la URL.");
};
} 

           
}
