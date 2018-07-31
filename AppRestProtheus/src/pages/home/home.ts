import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, LoadingController, Nav, MenuController } from 'ionic-angular';
import { ClientesPage } from '../clientes/clientes';
import { ProdutosPage } from '../produtos/produtos';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {
	@ViewChild(Nav) nav: Nav;
	
	//pagina principal
	rootPage = ClientesPage;

	user: string;
	pwd: string;
	menus: Array<{ title: string, componentes: any }>;

	constructor(
		public menu: MenuController,
		public navCtrl: NavController, 
		public navParams: NavParams, 
		public loadingCtrl: LoadingController
	) {
		this.user = this.navParams.get('user');
		this.pwd = this.navParams.get('pwd');
		// set app's menus
		this.menus = [
			{
				title: 'Consultar',
				componentes: [
					{ title: 'Clientes', page: ClientesPage },
					{ title: 'Produtos', page: ProdutosPage }
				]
			}
		];
		console.log("HomePage: Usuario e Senha: ", this.user +"-"+ this.pwd);
	}

	/** redireciona para outra page */
	openPage(page) {
		// close the menu when clicking a link from the menu
		this.menu.close();
		// navigate to the new page if it is not the current page
		this.nav.setRoot(page);
	}

}
