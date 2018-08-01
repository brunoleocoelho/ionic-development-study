import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { ServiceRestProvider } from '../../providers/service-rest/service-rest';
import { HttpClientModule } from '@angular/common/http';
import { Res } from '../../app/app.constants';
import { ClienteNovoPage } from '../cliente-novo/cliente-novo';
import { Cliente } from '../../models/cliente';

/**
 * Generated class for the ClienteDetalhesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-cliente-detalhes',
	templateUrl: 'cliente-detalhes.html',
})
export class ClienteDetalhesPage {
	/** Edição desabilitada T/F (boolean) */
	desabilitado: boolean = true;
	cliente: any;

	constructor(public navCtrl: NavController, public navParams: NavParams, private loadingCtrl: LoadingController,
	private alertCtrl: AlertController, public servico: ServiceRestProvider, public httpClient: HttpClientModule) {
		this.fillData();
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad ClienteDetalhesPage');
	}

	/** Preenche a variavel cliente conforme dados passados */
	fillData() {
		this.cliente = this.navParams.get('cliente');
		console.log("ClienteDetalhes:cliente: ", this.cliente);
	}

	/** Habilita a edição do cliente */
	habilitarEdicao() {
		if (this.desabilitado) {
			console.log("desabilitado: ", this.desabilitado);
		} else {
			this.salvarEdicao();
			this.navCtrl.pop();
		}
		this.desabilitado = !this.desabilitado;
	}

	/** Salva a edição do cliente, fazendo PUT Http para a base */
	salvarEdicao() {
		this.servico.putClientesAlterar(this.cliente).subscribe(
			resposta => console.log("ClienteNovo:salvarEdicao:OK ", resposta),
			err => console.log("ClienteNovo:salvarEdicao:Erro ", err)
		)
	}

	/** Leva ao formulário de criação de novo cliente */
	criarNovo() {
		if (this.desabilitado) {
			this.navCtrl.push(ClienteNovoPage);
		}
		else {
			this.presentConfirm();
		}
	}

	/** Exibe alerta de confirmação*/
	presentConfirm() {
		let alert = this.alertCtrl.create({
			title: 'Atenção!',
			message: 'Dados editados aqui serão perdidos.\nDeseja continuar?',
			buttons: [
				{
					text: Res.Strings.cancelar, role: 'cancel',
					handler: () => { console.log('Cancel clicked'); }
				},
				{
					text: Res.Strings.confirmar,
					handler: () => {
						console.log('Confirmar clicked');
						this.navCtrl.push(ClienteNovoPage);
					}
				}
			]
		});
		alert.present();
	}

}
