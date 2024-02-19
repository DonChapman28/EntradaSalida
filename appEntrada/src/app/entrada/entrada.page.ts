import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { BrowserQRCodeReader, Result, VideoInputDevice } from '@zxing/library';
import { Router } from '@angular/router';
import { ServicioFechaHoraService } from '../fechaHora/servicio-fecha-hora.service';


@Component({
  selector: 'app-entrada',
  templateUrl: './entrada.page.html',
  styleUrls: ['./entrada.page.scss'],
})
export class EntradaPage implements OnInit {
  
  alertButtons = ['Aceptar'];
  entrada : boolean = true;
  private codeReader: BrowserQRCodeReader;
  private selectedDevice: VideoInputDevice | null;
  private scanning: boolean = false;
  private mediaStream: MediaStream | null = null;
  private continueScanning: boolean = true;

  carnet: any;
  fechaEntrada: any;
  fechaSalida: any;

  constructor(private router: Router,
    private activated: ActivatedRoute,
    private alertController: AlertController,
    private toastController: ToastController,
    private fechaHora: ServicioFechaHoraService,
   ) { this.codeReader = new BrowserQRCodeReader();
    this.selectedDevice = null;}

  ngOnInit() {
    console.log(this.fechaHora.getFechaHora());
    console.log(this.entrada);
    this.fechaEntrada = this.fechaHora.getFechaHora();
  }

  async iniciarCamara() {
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
            this.carnet = result.getText();
            const datos = {'usuario: ': this.carnet,
            'entrada: ': this.fechaEntrada}
            console.log(datos)
            console.log('enviado');
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

  
    

 

  async mostrarAlerta() {
    const alert = await this.alertController.create({
      header: 'Registro exitoso',
      buttons: this.alertButtons
    });

    await alert.present();
 
    
  }
  
  async mostrarError() {
    const alert = await this.alertController.create({
      header: 'error',
      buttons: this.alertButtons
    });

    await alert.present(); 
    
  }
}
