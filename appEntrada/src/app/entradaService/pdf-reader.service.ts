import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { BrowserPDF417Reader, Result, VideoInputDevice } from '@zxing/library';
import { Router } from '@angular/router';
import { ServicioFechaHoraService } from '../fechaHora/servicio-fecha-hora.service';
import { Storage } from '@ionic/storage-angular';
import { StorageService } from '../servicioStorage/storage.service';
import { RegistroApiService } from '../registroApi/registro-api.service';
import { BrowserPlatformLocation } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class PdfReaderService {

  alertButtons = ['Aceptar'];
  private codeReader: BrowserPDF417Reader;
  private selectedDevice: VideoInputDevice | null;
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
    private api:RegistroApiService
    ) { this.codeReader = new BrowserPDF417Reader();
    this.selectedDevice = null;}

    

    async escannerPdf417(){
      try {
        const constraints = { video: { facingMode: 'environment' } };
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        if (stream) {
          // Almacenamos el stream en la propiedad mediaStream
        this.mediaStream = stream;
          const codeReader = new BrowserPDF417Reader();
          const videoInputDevices: VideoInputDevice[] = await codeReader.getVideoInputDevices();
    
          if (videoInputDevices && videoInputDevices.length > 0) {
            const selectedDevice: VideoInputDevice = videoInputDevices[0];
            codeReader.decodeFromInputVideoDevice(selectedDevice.deviceId).then((result: Result) => {
              this.codigo = result.getText();
              console.log(this.codigo);   
                var url = this.codigo;
                // Expresión regular para extraer el número de url
                var regex = /<F>(.*?)<\/F>/;
                // Ejecutar la expresión regular en la URL
                var match = url.match(regex);
                
                if (match) {
                    
                    var number = match[1];
                    this.codigo = number;       
                    console.log("Número de documento", number);
                  
                    console.log('enviado');
                    
                } else {
                    console.log("Número de RUT (o RUN) no encontrado en la URL.");
                    
                }
            });
            
            const video = document.getElementById('video') as HTMLVideoElement;
            video.srcObject = stream;
            video.play();
            console.log('funciona');
            
          } else {
            console.error('No se encontraron dispositivos de video.');
          }
        } else {
          console.error('No se pudo obtener acceso a la cámara.');
        }
      } catch (error) {
        console.error('Error al iniciar la cámara:', error);
      }
    }

  }


