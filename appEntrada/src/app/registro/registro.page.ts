import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { StorageService } from '../storageService/storage.service';
import { RegistroApiService } from '../registroService/registro-api.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  personas:any = [];
  registros :any = [];
  id : any ;

  constructor(private router: Router,
    private activated: ActivatedRoute,
    private alertController: AlertController,
    private toastController: ToastController,
    private storage: StorageService,
    private api: RegistroApiService) { }

  ngOnInit() {
    

    this.activated.paramMap.subscribe(p => {
      this.id = p.get('registro') ?? '';
      //con esta wea hacemos que horario tenga los datos que pedimos desde la api anasheeeeeeeiiiiii
      this.api.getRegistro(this.id).subscribe((horarioData: any) => {
        this.registros = horarioData;
        
      });
    });
   
    
    
  }
}
