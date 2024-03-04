import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServicioFechaHoraService {

  constructor() { }

  getFechaHora(){
    const fechaActual = new Date();
    
    const dia = fechaActual.getDate();
    const mes = fechaActual.getMonth() + 1; //los meses en js van de 0 a 11!
    const año = fechaActual.getFullYear();

    const fechaFormateada = `${dia}/${mes}/${año}`;
    const hora = ('0' + fechaActual.getHours()).slice(-2);
    const minutos = ('0' + fechaActual.getMinutes()).slice(-2);
   
    const horaFormateada = `${('0' + hora).slice(-2)}:${('0' + minutos).slice(-2)}`;
    const fechaHora = horaFormateada + '   ' + fechaFormateada;
    return (fechaHora);
  }
  
  getFecha(){
    const fechaActual = new Date();
    //fecha completa para el registro
    return (fechaActual);
  }
  
  getFechaRegistro(){
    const fechaActual = new Date();
    
    const dia = fechaActual.getDate();
    const mes = fechaActual.getMonth() + 1; //los meses en js van de 0 a 11!
    const año = fechaActual.getFullYear();

    const fechaFormateada = `${dia}/${mes}/${año}`;
    return(fechaFormateada);
  }

}

