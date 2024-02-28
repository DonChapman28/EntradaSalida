import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { BrowserQRCodeReader, Result, VideoInputDevice } from '@zxing/library';
import { Router } from '@angular/router';
import { ServicioFechaHoraService } from '../fechaHoraService/servicio-fecha-hora.service';
import { Storage } from '@ionic/storage-angular';
import { StorageService } from '../storageService/storage.service';
import { RegistroApiService } from '../registroService/registro-api.service';
import { AlertService } from '../alertaService/alert.service';
import { DatosServiceService } from './datos-service.service';
@Injectable({
  providedIn: 'root'
})
export class entradaService {

  alertButtons = ['Aceptar'];
  private codeReader: BrowserQRCodeReader;
  private selectedDevice: VideoInputDevice | null;
  private scanning: boolean = false;
  private mediaStream: MediaStream | null = null;
  private continueScanning: boolean = true;

  codigo: any;
  fechaEntrada: any;
  fechaSalida: any;
  fechaRegistro: any;
  tipo: any;

  constructor(private router: Router,
    private activated: ActivatedRoute,
    private alertController: AlertController,
    private toastController: ToastController,
    private fechaHora: ServicioFechaHoraService,
    private storage: StorageService,
    private api:RegistroApiService,
    private alert : AlertService,
    private dato : DatosServiceService
    ) { this.codeReader = new BrowserQRCodeReader();
    this.selectedDevice = null;}

    async entradaQr(){
      this.fechaEntrada = this.fechaHora.getFechaHora();
      this.fechaRegistro = this.fechaHora.getFecha();
      
      try {
        const constraints = { video: { facingMode: 'environment' } };
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        if (stream) {
          // Almacenamos el stream en la propiedad mediaStream
        this.mediaStream = stream;
          const codeReader = new BrowserQRCodeReader();
          const videoInputDevices: VideoInputDevice[] = await codeReader.getVideoInputDevices();
    
          if (videoInputDevices && videoInputDevices.length > 0) {
            const selectedDevice: VideoInputDevice = videoInputDevices[0];
            codeReader.decodeFromInputVideoDevice(selectedDevice.deviceId).then((result: Result) => {
              this.codigo = result.getText();
              console.log(this.codigo);
                var url = this.codigo;
                var regex = /RUN=(\d+-[0-9Kk])/;
                var match = url.match(regex);
                // Verificar si se encontró el número de RUT (o RUN)
                if (match) {
                    // El número de RUT (o RUN) se encuentra en el primer grupo capturado
                    var rut = match[1];
                    this.codigo = rut;
                    console.log("Número de RUT (o RUN):", rut);
                    const datos = {'id: ':this.codigo,
                    'rut: ': this.codigo,
                    'tipo: ': this.dato.tipo,
                    'entrada: ': this.fechaEntrada,
                    'fecha: ': this.fechaRegistro}
                    console.log(datos)
                    this.storage.saveRegistro(this.codigo,this.codigo,this.dato.tipo,this.fechaEntrada,this.fechaRegistro)
                    console.log('enviado');
                    this.alert.alertaEntrada();
                    
                } else {
                    console.log("Número de RUT (o RUN) no encontrado en la URL.");
                    this.alert.errorCarnet();
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
    //salir
    async salidaQr(){
      this.fechaSalida = this.fechaHora.getFechaHora();
      try {
        const constraints = { video: { facingMode: 'environment' } };
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        if (stream) {
        this.mediaStream = stream;
          const codeReader = new BrowserQRCodeReader();
          const videoInputDevices: VideoInputDevice[] = await codeReader.getVideoInputDevices();
    
          if (videoInputDevices && videoInputDevices.length > 0) {
            const selectedDevice: VideoInputDevice = videoInputDevices[0];
    
            codeReader.decodeFromInputVideoDevice(selectedDevice.deviceId).then((result: Result) => {
              this.codigo = result.getText();
              var url = this.codigo;      
              var regex = /RUN=(\d+-[0-9Kk])/;      
              var match = url.match(regex);
        
              if (match) {               
                  var rut = match[1];
                  this.codigo = rut;
                  console.log("Número de RUT (o RUN):", rut);
                  this.storage.setRegistro(this.codigo,this.fechaSalida);
                  console.log('enviado');                
              }
              else console.log("Número de RUT (o RUN) no encontrado en la URL.");
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

    private detenerCamara() {
      // Detener la cámara y liberar recursos
      if (this.mediaStream) {
        this.mediaStream.getTracks().forEach(track => track.stop());
        this.mediaStream = null;
      }
    }
  }

