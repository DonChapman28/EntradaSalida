import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { StorageService } from '../storageService/storage.service';
import { DatosServiceService } from '../codeReaderService/datos-service.service';
import { RegistroApiService } from '../registroService/registro-api.service';
import { ServicioFechaHoraService } from '../fechaHoraService/servicio-fecha-hora.service';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  entrada : boolean = true;
  personas:any = [];
  registros :any = [];
  id : any ;
  permitir : boolean = false;
  fechaEntrada: any;
  fechaSalida: any;
  fechaSeleccionada: any;
  fechaSeleccionada2: any;
  constructor(private router: Router,
    private activated: ActivatedRoute,
    private alertController: AlertController,
    private toastController: ToastController,
    private storage: StorageService,
    private datos: DatosServiceService,
    private api: RegistroApiService,
    private fechaHora: ServicioFechaHoraService
    ) { }

  ngOnInit() {
    

    this.activated.paramMap.subscribe(p => {
      this.id = p.get('registro') ?? '';
      //con esta wea hacemos que horario tenga los datos que pedimos desde la api anasheeeeeeeiiiiii
      this.api.getRegistroFechaActualApi().subscribe((registroData: any) => {
        this.registros = registroData;
        console.log(registroData);
        
        

    
      });
    });
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
