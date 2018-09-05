import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PedidosVendaPage } from './pedidos-venda';

@NgModule({
  declarations: [
    PedidosVendaPage,
  ],
  imports: [
    IonicPageModule.forChild(PedidosVendaPage),
  ],
})
export class PedidosVendaPageModule {}
