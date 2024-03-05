import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IngresoManualPageRoutingModule } from './ingreso-manual-routing.module';

import { IngresoManualPage } from './ingreso-manual.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IngresoManualPageRoutingModule
  ],
  declarations: [IngresoManualPage]
})
export class IngresoManualPageModule {}
