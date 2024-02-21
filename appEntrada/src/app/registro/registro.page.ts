import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { StorageService } from '../servicioStorage/storage.service';
import { RegistroApiService } from '../registroApi/registro-api.service';

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
    /* this.storage.getAllRegistro().then(x=> {this.personas = x; console.log(this.personas);
    }); */

    this.activated.paramMap.subscribe(p => {
      
      //con esta wea hacemos que traiga los datos que pedimos anasheeeeeeeiiiiii
      this.api.getRegistro().subscribe((registroData: any) => {
        this.registros = registroData;
        console.log(this.registros)
      });

    });
   
    
    
  }
}
