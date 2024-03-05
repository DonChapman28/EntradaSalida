import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { BrowserQRCodeReader,BrowserPDF417Reader, Result, VideoInputDevice } from '@zxing/library';
import { Router } from '@angular/router';
import { ServicioFechaHoraService } from 'src/app/fechaHoraService/servicio-fecha-hora.service';
import { Storage } from '@ionic/storage-angular';
import { StorageService } from 'src/app/storageService/storage.service';
import { entradaService } from 'src/app/codeReaderService/qr-reader.service';
import { DatosServiceService } from 'src/app/codeReaderService/datos-service.service';
import { PdfReaderService } from 'src/app/codeReaderService/pdf-reader.service';
import { NoQrReaderService } from 'src/app/codeReaderService/no-qr-reader.service';

@Component({
  selector: 'app-ingreso-manual',
  templateUrl: './ingreso-manual.page.html',
  styleUrls: ['./ingreso-manual.page.scss'],
})
export class IngresoManualPage implements OnInit {
  Tipo : any;
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
    private datos :DatosServiceService,
    private pdf: PdfReaderService,
    private noQr: NoQrReaderService) { }



  ngOnInit() {
    console.log(this.fechaHora.getFechaHora());
    console.log(this.entrada);
    this.fechaEntrada = this.fechaHora.getFechaHora();
    this.storage.init
   
   
    
  }

  registrar(){
    console.log(this.Tipo);
  }

  entradaPersona(){
    this.datos.tipo = this.Tipo;
  
    this.noQr.entrada(this.codigo);
  }



  salidaPersona(){
    
    this.noQr.salida(this.codigo);
  }
}
