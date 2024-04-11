import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { BrowserPDF417Reader, Result, VideoInputDevice } from '@zxing/library';
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
    private api:RegistroApiService,
    private datos: DatosServiceService,
    private alerta: AlertService
    ) { this.codeReader = new BrowserPDF417Reader();
    this.selectedDevice = null;}

    

    async escannerPdf417(){
      try {
        const constraints = { video: { facingMode: 'environment' } };
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: false,
          video: {
            width: { min: 640, ideal: 1920 },
            height: { min: 400, ideal: 1080 },
            aspectRatio: { ideal: 0.5625 },
            facingMode: 'environment' 
          }
        });
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
                    this.datos.ndocumento = this.codigo;    
                    console.log("Número de documento", this.datos.ndocumento);
                  this.alerta.alertaNDocumento();
                    console.log('enviado');
                    
                } else {
                    console.log("Número no encontrado en la URL.");
                    
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


