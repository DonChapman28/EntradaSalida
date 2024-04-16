import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController,Platform,ModalController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ServicioFechaHoraService } from 'src/app/fechaHoraService/servicio-fecha-hora.service';
import { StorageService } from 'src/app/storageService/storage.service';
import { entradaService } from 'src/app/codeReaderService/qr-reader.service';
import { DatosServiceService } from 'src/app/codeReaderService/datos-service.service';
import { BarcodeScanningModalComponent } from 'src/app/codeReaderService/barcode-scanning-modal.component';
import { LensFacing,BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';

@Component({
  selector: 'app-visita',
  templateUrl: './visita.page.html',
  styleUrls: ['./visita.page.scss'],
})
export class VisitaPage implements OnInit {
  alertButtons = ['Aceptar'];
  entrada : boolean = true;
  scanResult:any;
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
    private datos: DatosServiceService,
    private modalController: ModalController,
    private platform: Platform) { }

  ngOnInit()  : void {
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
}
