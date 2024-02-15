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

  entrada : boolean = true;
  private codeReader: BrowserQRCodeReader;
  private selectedDevice: VideoInputDevice | null;
  private scanning: boolean = false;
  private mediaStream: MediaStream | null = null;

  private continueScanning: boolean = true;

  constructor(private router: Router,
    private activated: ActivatedRoute,
    private alertController: AlertController,
    private toastController: ToastController,
    private fechaHora: ServicioFechaHoraService) { this.codeReader = new BrowserQRCodeReader();
      this.selectedDevice = null;}

  ngOnInit() {
    console.log(this.fechaHora.getFechaHora())
    console.log(this.fechaHora.getFechaHora().fecha)
    console.log(this.fechaHora.getFechaHora().hora)
    console.log(this.entrada)
  }

}
