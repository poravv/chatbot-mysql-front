import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { homeComponent } from './admin/pages/home/home.component';
import { PedidoComponent } from './admin/pages/pedido/pedido.component';
import { ConsultaComponent } from './admin/pages/consulta/consulta.component';

const routes: Routes = [
  { path: '', component: homeComponent },
  {
    path: 'pedido',
    children: [
      { path: 'list', component: PedidoComponent }
    ]
  },
  {
    path: 'consulta',
    children: [
      { path: 'list', component: ConsultaComponent }
    ]
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
