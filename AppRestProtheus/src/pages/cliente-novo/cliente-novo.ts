import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
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

	cliente: Cliente;

	constructor(public navCtrl: NavController, public navParams: NavParams, private servico: ServiceRestProvider, private httpCliente: HttpClientModule, private alertCtrl: AlertController) {
		this.cliente = new Cliente();		
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad ClienteNovoPage');
	}

	/** Redireciona para a criação de Cliente */
	criarCliente() {
		if (this.cliente.NOME != '' && this.cliente.NREDUZ != '' && this.cliente.ENDER != '' 
			&& this.cliente.TIPO != '' && this.cliente.EST != '' && this.cliente.MUN != ''
			&& this.cliente.CGC != '') {

			this.servico.postClienteIncluir(this.cliente).subscribe(
				resposta =>{ 
					console.log("ClienteNovo:criarCliente:OK ", resposta);
					this.voltar();
				},
				err => console.log("ClienteNovo:criarCliente:Erro ", err)
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
