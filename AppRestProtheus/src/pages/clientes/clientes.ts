import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ServiceRestProvider } from '../../providers/service-rest/service-rest';
import { HttpClientModule } from '@angular/common/http';
import { ClienteNovoPage } from '../cliente-novo/cliente-novo';

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

	dados : any;
	clientes: any[];//Array<Cliente> 

	constructor(public navCtrl: NavController, public navParams: NavParams, private servico: ServiceRestProvider, private httpCliente: HttpClientModule, private loadingCtrl: LoadingController) {
		this.getDados();
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad ClientesPage');
	}

	/** Exibe um elemtento loading */
	presentLoading() {
		const loader = this.loadingCtrl.create({
			content: '<ion-spinner name="crescent">Carregando...</ion-spinner>',
			duration: 1000
		});
		loader.present();
	}

	/** Preenche os clientes na tela */
	fillClientes(){
		if (this.dados.Descricao == "OK") {
			this.clientes = this.dados.Clientes;
		}
	}

	/** Carrega os clientes pelo service ServiceClienteProvider */
	getDados(){
		this.presentLoading();
		console.log("ClientesPage: Clicou getDados()");
		this.servico.getClientesTodos().subscribe( 
			data => {
				this.dados = data;
				this.fillClientes();
				console.log("Data Clientes:Service: ", this.dados);
			},
			erro => { console.log("Erro Clientes:Service: ", erro); }
		);	
	}

	/** Navega p/ a pagina de detalhes do cliente */
	addNovoCliente(){
		console.log("ClientesPage: Clicou addNovoCliente()");
		// //var aux = new Cliente();
		this.navCtrl.push(ClienteNovoPage);
	}

	/** Vai para detalhes do cliente */
	goToAnotherPage(item){
		console.log("Detalhes do cliente", item.NOME)
	}
}
