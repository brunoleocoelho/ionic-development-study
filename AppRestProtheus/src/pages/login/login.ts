import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { HttpClientModule } from '@angular/common/http';
import { ServiceRestProvider } from '../../providers/service-rest/service-rest';
import { Res } from '../../app/app.constants';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-login',
	templateUrl: 'login.html',
})
export class LoginPage {
	dados: any;
	user: string;
	pwd: string;

	constructor(public navCtrl: NavController, public navParams: NavParams, private servico: ServiceRestProvider, 
	private clienteHttp: HttpClientModule, private alertCtrl: AlertController) {
		this.user = '';
		this.pwd = '';
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad LoginPage');
	}

	/** Efetua o Login do usuário */
	fazerLogIn() {
		if (this.user.length == 0 || (this.pwd.length == 0)) {
			this.showAlertaLogin('Entrada Inválida!','Usuário e Senha devem ser preenchidos');
		}
		else{
			this.servico.logUserIn(this.user, this.pwd).subscribe(
				data => {
					console.log("LoginPage:fazerLogin:data: ", data);
					this.dados = data;
					this.checkLogin()
				},
				err => {
					console.log("LoginPage:fazerLogin:err: ", err);
					this.showAlertaLogin('Erro de rede!','Não foi possível verificar Usuario e Senha.');
				}
			)
		}
	}
	
	//verifica se os dados retornados são válidos para login
	checkLogin(){
		if (this.dados.Status != 1) {
			this.navCtrl.push(HomePage, {user: this.user, pwd: this.pwd});
		} else {
			this.showAlertaLogin('Erro de Usuário/Senha', this.dados.Descricao + ' Verifique!');
		}
	}

	/** Exibe alerta de confirmação ou erro */
	showAlertaLogin(titulo: string, mensagem: string) {
		let alert = this.alertCtrl.create({
		  title: titulo,
		  message: mensagem,
		  buttons: [
			{ 	text: 'OK',
				role: 'close',
			  	handler: () => {}
			}
		  ]
		});
		alert.present();
	}
}
