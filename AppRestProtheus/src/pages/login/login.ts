import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav, AlertController, LoadingController, Loading } from 'ionic-angular';
import { HomePage } from '../home/home';
import { HttpClientModule } from '@angular/common/http';
import { ServiceRestProvider } from '../../providers/service-rest/service-rest';
import { Usuario } from '../../models/usuario';

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
	loader: Loading;
	dados: any;
	usuario: Usuario;
	user: string;
	pwd: string;

	constructor(public navCtrl: NavController, public navParams: NavParams, private servico: ServiceRestProvider, 
	private clienteHttp: HttpClientModule, private alertCtrl: AlertController, private loadingCtrl: LoadingController) {
		this.user = '';
		this.pwd = '';
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad LoginPage');
	}

	/** Exibe um elemento loading */
	createLodaing() {
		this.loader = this.loadingCtrl.create({
			spinner: 'dots',
			content: 'Fazendo Login...'//'<ion-spinner name="dots">Fazendo Login...</ion-spinner>'
			// duration: 1000
		});
	}
	
	/** Efetua o Login do usuário */
	fazerLogIn() {
		//exibindo imagem de loading
		this.createLodaing();
		//enviando dados de login
		if (this.user.length == 0 || (this.pwd.length == 0)) {
            this.showAlertaLogin('Entrada Inválida!','Usuário e Senha devem ser preenchidos.');            
		}
		else{
            this.loader.present();
			this.servico.logUserIn(this.user, this.pwd).subscribe(
				data => {
					console.log("LoginPage:fazerLogin:data: ", data);
					this.dados = data;
                    this.checkLogin() //verifica retorno de login
                    //armazenar login efetuado localmente
                    //https://www.youtube.com/watch?time_continue=13&v=dewZD47BpTY
					//removendo exibição do loading
					this.loader.dismiss();
				},
				err => {
					console.log("LoginPage:fazerLogin:err: ", err);
					this.showAlertaLogin('Erro de rede!','Não foi possível verificar Usuario e Senha.');
					//removendo exibição do loading
					this.loader.dismiss();
				}
			)
		}
	}
	
	/** Verifica se os dados retornados são válidos para login */
	checkLogin(){
		if (this.dados.Status != 1) {
			this.usuario = this.dados.Usuario;
			if (this.usuario != null) {
				if (this.usuario.USRNAME == this.user.toLowerCase() && !this.usuario.BLOQUEIO) {
					// this.navCtrl.pop().then( ()=> this.navCtrl.push(HomePage, {usuario: this.usuario}) );
					this.navCtrl.push(HomePage, {usuario: this.usuario}).then(()=>{
						let index = 0;
						this.navCtrl.remove(index);
					});
				}
				else{
					this.showAlertaLogin('Erro de Usuário/Senha', 'Usuário não condiz com o registrado na base. Verifique!');
					console.log('LoginPage:CheckLogin:dados.Usuario:', this.dados.Usuario)
				}
			}
			// this.loader.dismiss();
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
