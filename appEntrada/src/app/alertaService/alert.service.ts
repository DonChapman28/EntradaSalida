import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { DatosServiceService } from '../codeReaderService/datos-service.service';
import { ThisReceiver } from '@angular/compiler';
@Injectable({
providedIn: 'root'
})
export class AlertService {
alertButtons = ['Aceptar'];

constructor(private alertController: AlertController,
private router: Router,
private dato : DatosServiceService) { }

async alertaEntrada() {
    const alert = await this.alertController.create({
      header: 'Entrada Registrada'
    });
    await alert.present();
    setTimeout(() => {alert.dismiss();}, 3000);
  }

async errorCarnet() {
const alert = await this.alertController.create({
header: 'Cedula de identidad no valida',
});
await alert.present();
setTimeout(() => {alert.dismiss();}, 3000);
}

async errorSalida() {
const alert = await this.alertController.create({
header: 'error salida',
});
await alert.present();
setTimeout(() => {alert.dismiss();}, 3000);
}

async alertaSalida() {
const alert = await this.alertController.create({
header: 'Salida Registrada',
});
await alert.present();
setTimeout(() => {alert.dismiss();}, 3000);
}

async alertaNDocumento() {
const alert = await this.alertController.create({
header: 'Documento Registrado',
});
await alert.present();
setTimeout(() => {alert.dismiss();}, 3000);
}

async alertaPrueba() {
const alert = await this.alertController.create({
header: 'Salida Registrada',
});
await alert.present();
setTimeout(() => {alert.dismiss();}, 3000);
}

}
