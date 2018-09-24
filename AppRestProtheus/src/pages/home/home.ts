import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, LoadingController, Nav, MenuController } from 'ionic-angular';
import { ClientesPage } from '../clientes/clientes';
import { ProdutosPage } from '../produtos/produtos';
import { Usuario } from '../../models/usuario';
import { ClienteNovoPage } from '../cliente-novo/cliente-novo';
import { PedidosVendaPage } from '../pedidos-venda/pedidos-venda';
import { AppGlobals } from "../../app/app.globals";
import { MenuPage } from '../menu/menu';

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
	rootPage = MenuPage;

	usuario: Usuario;	
	menus: Array<{ title: string, componentes: any }>;

	/** CONSTRUTOR */
	constructor(
		public menu: MenuController,
		public navCtrl: NavController, 
		public navParams: NavParams, 
		public loadingCtrl: LoadingController,
		private _usuario: AppGlobals
	) {
		this.usuario = _usuario.usuario;//this.navParams.get('usuario');		
		console.log("USUARIO na HomePage", this.usuario);
		// set app's menus
		this.menus = this._usuario.menus;
        
		console.log("HomePage: Usuario entrou: ", this.usuario.NOME);
		console.log("HomePage: Menus: ", this._usuario.menus);
	}

	/** Redireciona para outra page */
	openPage(page) {
		// close the menu when clicking a link from the menu
		this.menu.close();
		// navigate to the new page if it is not the current page
		this.nav.setRoot(page);
	}

}
