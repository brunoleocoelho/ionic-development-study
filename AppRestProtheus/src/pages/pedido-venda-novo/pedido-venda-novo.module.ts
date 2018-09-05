import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PedidoVendaNovoPage } from './pedido-venda-novo';

@NgModule({
  declarations: [
    PedidoVendaNovoPage,
  ],
  imports: [
    IonicPageModule.forChild(PedidoVendaNovoPage),
  ],
})
export class PedidoVendaNovoPageModule {}
