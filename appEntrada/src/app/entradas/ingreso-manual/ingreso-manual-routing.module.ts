import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IngresoManualPage } from './ingreso-manual.page';

const routes: Routes = [
  {
    path: '',
    component: IngresoManualPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IngresoManualPageRoutingModule {}
