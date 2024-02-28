import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  alertButtons = ['Aceptar'];

  constructor(private alertController: AlertController) { }

  async alertaEntrada() {
    const alert = await this.alertController.create({
      header: 'Entrada Registrada',
      buttons: this.alertButtons
    });
    await alert.present();
  }

  async errorCarnet() {
    const alert = await this.alertController.create({
      header: 'Cedula de identidad invalida',
      buttons: this.alertButtons
    });
    await alert.present();
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
