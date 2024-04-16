import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ServicioFechaHoraService } from '../fechaHoraService/servicio-fecha-hora.service';
import { Storage } from '@ionic/storage-angular';
import { StorageService } from '../storageService/storage.service';
import { RegistroApiService } from '../registroService/registro-api.service';
import { BrowserPlatformLocation } from '@angular/common';
import { DatosServiceService } from './datos-service.service';
import { AlertService } from '../alertaService/alert.service';

@Injectable({
  providedIn: 'root'
})
export class PdfReaderService {

  alertButtons = ['Aceptar'];
  private scanning: boolean = false;
  private mediaStream: MediaStream | null = null;
  private continueScanning: boolean = true;

  codigo: any;
  fechaEntrada: any;
  fechaSalida: any;
  fechaRegistro: any;

  constructor(private router: Router,
    private activated: ActivatedRoute,
    private alertController: AlertController,
    private toastController: ToastController,
    private fechaHora: ServicioFechaHoraService,
    private storage: StorageService,
    private api:RegistroApiService,
    private datos: DatosServiceService,
    private alerta: AlertService
    ) { }

    

    async escannerPdf417(code: any){
      
              this.codigo = code;
              console.log(this.codigo);   
                var url = this.codigo;
                // Expresión regular para extraer el número de url
                var regex = /<F>(.*?)<\/F>/;
                // Ejecutar la expresión regular en la URL
                var match = url.match(regex);
                
                if (match) {
                    
                    var number = match[1];
                    this.codigo = number;   
                    this.datos.ndocumento = this.codigo;    
                    console.log("Número de documento", this.datos.ndocumento);
                  this.alerta.alertaNDocumento();
                    console.log('enviado');
                    
                } else {
                    console.log("Número no encontrado en la URL.");
                    
                }
            };
            
           
  }


