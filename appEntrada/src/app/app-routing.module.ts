import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'entrada/:tipo',
    loadChildren: () => import('./entrada/entrada.module').then( m => m.EntradaPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'cliente/:tipo',
    loadChildren: () => import('./entradas/cliente/cliente.module').then( m => m.ClientePageModule)
  },
  {
    path: 'visita/:tipo',
    loadChildren: () => import('./entradas/visita/visita.module').then( m => m.VisitaPageModule)
  },
  {
    path: 'proveedor/:tipo',
    loadChildren: () => import('./entradas/proveedor/proveedor.module').then( m => m.ProveedorPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
