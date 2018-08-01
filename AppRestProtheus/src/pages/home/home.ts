import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, LoadingController, Nav, MenuController } from 'ionic-angular';
import { ClientesPage } from '../clientes/clientes';
import { ProdutosPage } from '../produtos/produtos';
import { Usuario } from '../../models/usuario';
import { ClienteNovoPage } from '../cliente-novo/cliente-novo';

/**
 * HomePage vai conter o menu lateral, e exbir cada uma das views
 * dentro da tag <nav>, recebendo-as no [root] pela variavel 'rootPage'
 */
@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {
	@ViewChild(Nav) nav: Nav;
	
	//pagina principal
	rootPage = ClientesPage;

	usuario: Usuario;	
	menus: Array<{ title: string, componentes: any }>;

	/** CONTRUTOR */
	constructor(
		public menu: MenuController,
		public navCtrl: NavController, 
		public navParams: NavParams, 
		public loadingCtrl: LoadingController
	) {
		this.usuario = this.navParams.get('usuario');		
		// set app's menus
		this.menus = [
			{
				title: 'Consultar',
				componentes: [
					{ title: 'Clientes', page: ClientesPage },
					{ title: 'Produtos', page: ProdutosPage }
				]
			},
			{
				title: 'Cadastrar',
				componentes: [
					{ title: 'Clientes', page: ClienteNovoPage }					
				]
			}
		];
		console.log("HomePage: Usuario entrou: ", this.usuario.NOME);
	}

	/** Redireciona para outra page */
	openPage(page) {
		// close the menu when clicking a link from the menu
		this.menu.close();
		// navigate to the new page if it is not the current page
		this.nav.setRoot(page);
	}

}
