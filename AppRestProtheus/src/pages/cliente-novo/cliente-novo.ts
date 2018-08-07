import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Loading } from 'ionic-angular';
import { ServiceRestProvider } from '../../providers/service-rest/service-rest';
import { HttpClientModule } from '@angular/common/http';
import { Cliente } from '../../models/cliente';
import { Res } from "../../app/app.constants";

/**
 * Generated class for the ClienteNovoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-cliente-novo',
	templateUrl: 'cliente-novo.html',
})
export class ClienteNovoPage {
	loader: Loading;
	cliente: Cliente;

	constructor(public navCtrl: NavController, public navParams: NavParams, private servico: ServiceRestProvider, private httpCliente: HttpClientModule, private alertCtrl: AlertController, private loadingCtrl: LoadingController) {
		this.cliente = new Cliente();		
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad ClienteNovoPage');
	}

	/** Redireciona para a criação de Cliente */
	criarCliente() {
		this.createLodaing()

		if (this.cliente.NOME != '' && this.cliente.NREDUZ != '' && this.cliente.ENDER != '' 
			&& this.cliente.TIPO != '' && this.cliente.EST != '' && this.cliente.MUN != ''
			&& this.cliente.CGC != '') {
			//Acresenta 'App' no inicio da Observação
			var aux = this.cliente.OBSERV;
			this.cliente.OBSERV = "App:" + aux;

			this.servico.postClienteIncluir(this.cliente).subscribe(
				resposta =>{ 
					console.log("ClienteNovo:criarCliente:OK ", resposta);
					this.loader.dismiss();
					this.voltar();
				},
				err =>{
					console.log("ClienteNovo:criarCliente:Erro ", err);
					this.loader.dismiss();
				}
			)
			console.log("ClienteNovo:cliente:", this.cliente);		
			
		} else {
			this.showAlerta('Campos Obrigatórios!', 'Existem campos obrigatórios não preenchidos.');
		}		
	}

	/** Redireciona para a página root */
	voltar() {
		this.navCtrl.popToRoot();
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


	/** Exibe alerta de confirmação ou erro */
	showAlerta(titulo: string, mensagem: string) {
		let alert = this.alertCtrl.create({
			title: titulo,
			message: mensagem,
			buttons: [{	
				text: 'OK',
				role: 'close'				
			}]
		});
		alert.present();
	}

}
