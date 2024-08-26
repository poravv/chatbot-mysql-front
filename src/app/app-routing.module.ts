import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { homeComponent } from './admin/pages/home/home.component';
import { PedidoComponent } from './admin/pages/pedido/pedido.component';

const routes: Routes = [
  { path: '', component: homeComponent },
  {
    path: 'pedido',
    children: [
      { path: 'list', component: PedidoComponent }
    ]
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
