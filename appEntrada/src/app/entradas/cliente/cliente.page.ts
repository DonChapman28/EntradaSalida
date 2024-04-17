import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController,ModalController, Platform} from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ServicioFechaHoraService } from 'src/app/fechaHoraService/servicio-fecha-hora.service';
import { Storage } from '@ionic/storage-angular';
import { StorageService } from 'src/app/storageService/storage.service';
import { entradaService } from 'src/app/codeReaderService/qr-reader.service';
import { DatosServiceService } from 'src/app/codeReaderService/datos-service.service';
import { PdfReaderService } from 'src/app/codeReaderService/pdf-reader.service';
import { BarcodeScanningModalComponent } from 'src/app/codeReaderService/barcode-scanning-modal.component';
import { BarcodeScanningModalComponent417 } from 'src/app/codeReaderService/barcode-scanning-modalPdf417.component';
import { LensFacing,BarcodeScanner, BarcodeFormat } from '@capacitor-mlkit/barcode-scanning';
@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.page.html',
  styleUrls: ['./cliente.page.scss'],
})
export class ClientePage implements OnInit {

  alertButtons = ['Aceptar'];
  entrada : boolean = true;
  scanResult: any;
  pdf417: any;
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
    private pdf: PdfReaderService,private modalController: ModalController,
    private platform: Platform
   ) {}

  ngOnInit(): void {
    if(this.platform.is('capacitor')){
      BarcodeScanner.isSupported().then();
      BarcodeScanner.checkPermissions().then();
      BarcodeScanner.removeAllListeners();
    }
    
    console.log(this.fechaHora.getFechaHora());
    console.log(this.entrada);
    this.fechaEntrada = this.fechaHora.getFechaHora();
    this.storage.init
   
    this.activated.paramMap.subscribe(p => {
      this.datos.tipo = p.get('tipo') ?? '';
      console.log(this.datos.tipo);
    });
    this.storage.getRegistrosPorTipo(this.datos.tipo).then(x=> {this.personas = x; console.log(this.personas);
    });
    
  }
 
  async startScan(){
    
    const modal = await this.modalController.create({
      component: BarcodeScanningModalComponent,
      cssClass : 'barcode-scanning-modal',
      showBackdrop: false,
      componentProps: { 
        formats : [],
        LensFacing: LensFacing.Back
       }
      });
    
      await modal.present();
  
      const {data} = await modal.onWillDismiss();
      if(data){
        this.scanResult = data?.barcode?.displayValue;
        this.entradaService.entradaQr(this.scanResult);
        console.log(this.scanResult);
      }
  }

  async startScan2(){
    
    const modal = await this.modalController.create({
      component: BarcodeScanningModalComponent,
      cssClass : 'barcode-scanning-modal',
      showBackdrop: false,
      componentProps: { 
        formats : [],
        LensFacing: LensFacing.Back
       }
      });
    
      await modal.present();
  
      const {data} = await modal.onWillDismiss();
      if(data){
        this.scanResult = data?.barcode?.displayValue;
        this.entradaService.salidaQr(this.scanResult);
        console.log(this.scanResult);
      }
  }

  async startScan417(){
    
    const modal = await this.modalController.create({
      component: BarcodeScanningModalComponent417,
      cssClass : 'barcode-scanning-modal',
      showBackdrop: false,
      componentProps: { 
        formats : [] ,
        LensFacing: LensFacing.Back
       }
      });
    
      await modal.present();
  
      const {data} = await modal.onWillDismiss();
      if(data){
        this.pdf417 = data?.barcode?.displayValue;
        this.pdf.escannerPdf417(this.pdf417);
        console.log(this.pdf417);
      }
  }
/*   lectorPdf(){
    this.pdf.escannerPdf417(this.scanResult);
  } */

  

  
  
}
