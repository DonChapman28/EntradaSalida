import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { BrowserQRCodeReader,Result, VideoInputDevice } from '@zxing/library';
import { Router } from '@angular/router';
import { ServicioFechaHoraService } from '../fechaHoraService/servicio-fecha-hora.service';
import { Storage } from '@ionic/storage-angular';
import { StorageService } from '../storageService/storage.service';
import { entradaService } from '../codeReaderService/qr-reader.service';
import { PdfReaderService } from '../codeReaderService/pdf-reader.service';

@Component({
  selector: 'app-entrada',
  templateUrl: './entrada.page.html',
  styleUrls: ['./entrada.page.scss'],
})
export class EntradaPage implements OnInit {
  
  alertButtons = ['Aceptar'];
  entrada : boolean = true;

  personas:any = [];
  codigo: any;
  fechaEntrada: any;
  fechaSalida: any;

  constructor(private router: Router,
    private activated: ActivatedRoute,
    private alertController: AlertController,
    private toastController: ToastController,
    private fechaHora: ServicioFechaHoraService,
    private storage: StorageService,
    private entradaService: entradaService,
    private pdf417 : PdfReaderService
   ) {}

  ngOnInit() {
    console.log(this.fechaHora.getFechaHora());
    console.log(this.entrada);
    this.fechaEntrada = this.fechaHora.getFechaHora();
    this.storage.init
    this.storage.getAllRegistro().then(x=> {this.personas = x; console.log(this.personas);
    });
  }

  entradaPersona(){
    this.pdf417.escannerPdf417();
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
