import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { ClientesPage } from '../pages/clientes/clientes';
import { ServiceRestProvider } from '../providers/service-rest/service-rest';
import { ProdutosPage } from '../pages/produtos/produtos';
import { ClienteNovoPage } from '../pages/cliente-novo/cliente-novo';
import { ClienteDetalhesPage } from '../pages/cliente-detalhes/cliente-detalhes';
import { BarcodeScanner } from "@ionic-native/barcode-scanner";
@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    HomePage,
    ClientesPage,
    ClienteNovoPage,
    ClienteDetalhesPage,
    ProdutosPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    HomePage,
    ClientesPage,
    ClienteNovoPage,
    ClienteDetalhesPage,
    ProdutosPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ServiceRestProvider,
    BarcodeScanner
  ]
})
export class AppModule {}
