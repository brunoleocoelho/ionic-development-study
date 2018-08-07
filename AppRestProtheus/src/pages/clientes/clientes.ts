import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading, Refresher } from 'ionic-angular';
import { ServiceRestProvider } from '../../providers/service-rest/service-rest';
import { HttpClientModule } from '@angular/common/http';
import { ClienteNovoPage } from '../cliente-novo/cliente-novo';
import { Cliente } from '../../models/cliente';
import { ClienteDetalhesPage } from '../cliente-detalhes/cliente-detalhes';
import { BarcodeScanner } from "@ionic-native/barcode-scanner";
/**
 * Generated class for the ClientesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-clientes',
	templateUrl: 'clientes.html',
})
export class ClientesPage {
	loader: Loading;
	refresh: Refresher;
	dados : any;
	clientes: Array<Cliente> ;
    textoErro: string;
    codigolido: any = "";
    errolido: any = "";

	constructor(public navCtrl: NavController, public navParams: NavParams, private servico: ServiceRestProvider, private loadingCtrl: LoadingController, private barCodScanner: BarcodeScanner) {
		this.getDados();
	}
	
	/* Chamado após término do carregamento da view */
	ionViewDidLoad() {
		console.log('ionViewDidLoad ClientesPage');
	}
	
	/** Exibe um elemento loading */
	createLodaing() {
		this.loader = this.loadingCtrl.create({
			spinner: 'crescent',
			content: 'Carregando...'//'<ion-spinner name="crescent">Carregando...</ion-spinner>'
			// duration: 1000
		});
		this.loader.present();
	}
	
	/** Preenche os clientes na tela */
	fillClientes(){
		if (this.dados.Descricao == "OK") {
			this.clientes = this.dados.Clientes;
		}
	}
	
	/** Carrega os clientes pelo service ServiceClienteProvider */
	getDados(){
		this.createLodaing();
		console.log("ClientesPage: Clicou getDados()");
		this.servico.getClientesTodos().subscribe( 
			data => {
				this.dados = data;
				console.log("Data Clientes:Service: ", this.dados);
				this.fillClientes();
				this.loader.dismiss();
				this.completeRefresh();
			},
			erro => { 
				console.log("Erro Clientes:Service: ", erro); 
				this.textoErro = "Erro ao buscar clientes";
				this.loader.dismiss();
				this.completeRefresh();
			}
		);	
	}

	/** Chamado pelo pull-to-refresh */
	doRefresh(refresher){
		this.refresh = refresher;
		console.log('Begin async operation', refresher);
		this.getDados();		
	}
	/** Finaliza o refresher */
	completeRefresh(){
		if (this.refresh != null) {
			this.refresh.complete();
			this.refresh = null;			
		}
	}

	/** Navega p/ a pagina de detalhes do cliente */
	addNovoCliente(){
		console.log("ClientesPage: Clicou addNovoCliente()");
		// //var aux = new Cliente();
		this.navCtrl.push(ClienteNovoPage);
	}

	/** Vai para detalhes do cliente */
	goToAnotherPage(item){		
		this.navCtrl.push(ClienteDetalhesPage, {cliente: item});
    }
    
    /** Abre o leitor de codigo de barras */
    scanBarCode(){
        this.barCodScanner.scan()
        .then(
            barCodeData =>{ this.codigolido = barCodeData.text },
        )
        .catch(
            err => { this.errolido = err }
        )
    }
}
