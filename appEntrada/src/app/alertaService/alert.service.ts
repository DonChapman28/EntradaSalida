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
      header: 'Entrada Registrada',
      buttons: [{
          text: 'Aceptar',
          handler: () => {location.reload();}}]
    });
    await alert.present();
  }

  async errorCarnet() {
    const alert = await this.alertController.create({
      header: 'Cedula de identidad invalida',
      buttons: [{
        text: 'Aceptar',
        handler: () => {location.reload();}}]
    });
    await alert.present();
  }

  async errorSalida() {
    const alert = await this.alertController.create({
      header: 'error salida',
      buttons: [{
        text: 'Aceptar',
        handler: () => {location.reload();}}]
    });
    await alert.present();
  }

  async alertaSalida() {
    const alert = await this.alertController.create({
      header: 'Salida Registrada',
      buttons: [{
        text: 'Aceptar',
        handler: () => {location.reload();}}]
    });
    await alert.present();
  }

  async alertaNDocumento() {
    const alert = await this.alertController.create({
      header: 'Documento Registrado',
      buttons: this.alertButtons
    });
    await alert.present();
  }

  async alertaPrueba() {
    const alert = await this.alertController.create({
      header: 'Salida Registrada',
      buttons: [{
        text: 'Aceptar',
        handler: () => {location.reload();}}]
    });
    await alert.present();
  }

}
