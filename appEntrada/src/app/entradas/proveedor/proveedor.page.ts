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


@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.page.html',
  styleUrls: ['./proveedor.page.scss'],
})
export class ProveedorPage implements OnInit {

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
    private datos: DatosServiceService
   ) {}

  ngOnInit() {
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

  entradaPersona(){
    this.entradaService.entradaQr();
  }

  salidaPersona(){
    this.entradaService.salidaQr();
  }
 
}

