import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { BrowserQRCodeReader, Result, VideoInputDevice } from '@zxing/library';
import { Router } from '@angular/router';
import { ServicioFechaHoraService } from '../fechaHora/servicio-fecha-hora.service';
import { Storage } from '@ionic/storage-angular';
import { StorageService } from '../servicioStorage/storage.service';
import { entradaService } from '../entradaService/entrada-servicio.service';

@Component({
  selector: 'app-entrada',
  templateUrl: './entrada.page.html',
  styleUrls: ['./entrada.page.scss'],
})
export class EntradaPage implements OnInit {
  
  alertButtons = ['Aceptar'];
  entrada : boolean = true;
  private codeReader: BrowserQRCodeReader;
  private selectedDevice: VideoInputDevice | null;
  private scanning: boolean = false;
  private mediaStream: MediaStream | null = null;
  private continueScanning: boolean = true;

  codigo: any;
  fechaEntrada: any;
  fechaSalida: any;

  constructor(private router: Router,
    private activated: ActivatedRoute,
    private alertController: AlertController,
    private toastController: ToastController,
    private fechaHora: ServicioFechaHoraService,
    private storage: StorageService,
    private entradaService: entradaService
   ) { this.codeReader = new BrowserQRCodeReader();
    this.selectedDevice = null;}

  ngOnInit() {
    console.log(this.fechaHora.getFechaHora());
    console.log(this.entrada);
    this.fechaEntrada = this.fechaHora.getFechaHora();
    this.storage.init
  }

  entradaPersona(){
    this.entradaService.entradaQr();
  }

  salidaPersona(){
    this.entradaService.salidaQr();
  }

  

  async mostrarError() {
    const alert = await this.alertController.create({
      header: 'error',
      buttons: this.alertButtons
    });

    await alert.present(); 
    
  }

  
}
