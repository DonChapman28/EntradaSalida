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
import { DatosServiceService } from '../codeReaderService/datos-service.service';
import { RegistroApiService } from '../registroService/registro-api.service';

@Component({
  selector: 'app-entrada',
  templateUrl: './entrada.page.html',
  styleUrls: ['./entrada.page.scss'],
})
export class EntradaPage implements OnInit {
  
  alertButtons = ['Aceptar'];
  entrada : boolean = true;
  permitir : boolean = false;
  personas:any = [];
  codigo: any;
  fechaEntrada: any;
  fechaSalida: any;
  fechaSeleccionada: any;
  id : any;
  registros : any;


  constructor(private router: Router,
    private activated: ActivatedRoute,
    private alertController: AlertController,
    private toastController: ToastController,
    private fechaHora: ServicioFechaHoraService,
    private storage: StorageService,
    private entradaService: entradaService,
    private pdf417 : PdfReaderService,
    private datos: DatosServiceService,
    private api: RegistroApiService
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

  capturarFecha(event: any) {
    const fechaSeleccionadaString = event.detail.value;
    const fechaSeleccionadaDate = new Date(fechaSeleccionadaString);
    if (!isNaN(fechaSeleccionadaDate.getTime())) {
        
        const dia = ('0' + fechaSeleccionadaDate.getDate()).slice(-2);
        const mes = ('0' + (fechaSeleccionadaDate.getMonth() + 1)).slice(-2); 
        const año = fechaSeleccionadaDate.getFullYear();
        const fechaFormateada = `${año}-${mes}-${dia}`;
        this.datos.fechaFiltro = fechaFormateada;
        console.log(fechaFormateada);
        console.log(this.datos.fechaFiltro);
        this.api.getRegistroApiFiltro(fechaFormateada);
    } else {
        console.error('Fecha seleccionada no válida');
    }
}

filtrar(){
    console.log(this.datos.fechaFiltro);
    this.api.getRegistroApiFiltro(this.datos.fechaFiltro).subscribe((registroData: any) => {
      this.registros = registroData;
      console.log(registroData);
      
    });
  
}

mostrarDatos()
    {
      this.permitir = !this.permitir;
    }
  
}
