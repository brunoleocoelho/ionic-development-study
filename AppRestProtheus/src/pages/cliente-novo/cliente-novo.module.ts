import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClienteNovoPage } from './cliente-novo';

@NgModule({
  declarations: [
    ClienteNovoPage,
  ],
  imports: [
    IonicPageModule.forChild(ClienteNovoPage),
  ],
})
export class ClienteNovoPageModule {}
