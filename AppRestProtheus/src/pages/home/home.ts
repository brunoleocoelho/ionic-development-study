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
    menuPage = MenuPage;
	usuario: Usuario;	
	menus: Array<{ titulo: string, componentes: any }>;

	/** CONSTRUTOR */
	constructor(
		public menu: MenuController,
		public navCtrl: NavController, 
		public navParams: NavParams, 
		public loadingCtrl: LoadingController,
		private _globals: AppGlobals
	) {
		this.usuario = _globals.usuario;//this.navParams.get('usuario');		
		// console.log("USUARIO na HomePage", this.usuario);
        // set app's menus
        this.definirMenus();        
		this.menus = this._globals.menus;
        
		// console.log("HomePage: Usuario entrou: ", this.usuario.NOME);
		// console.log("HomePage: Menus: ", this._globals.menus);
	}

	/** Redireciona para outra page */
	openPage(page) {
		// close the menu when clicking a link from the menu
		this.menu.close();
		// navigate to the new page if it is not the current page
		this.nav.setRoot(page);
	}

    /** define os menus acessiveis pelo usuário no app 
     * Estrutura do menu: 
     * {
     *  titulo (string), 
     *  componentes (array): {
     *      titulo (string), 
     *      page (string), 
     *      icone (string), 
     *      nivel (number)
     *  }
     * }
     * 
    */
    definirMenus(){
        let menu = [
            {
                titulo: 'Consultar',
                componentes: [
                    { titulo: 'Clientes', page: ClientesPage, icone: 'podium' },
                    { titulo: 'Pedidos de Venda', page: PedidosVendaPage, icone: 'open' },
                    { titulo: 'Produtos', page: ProdutosPage, icone: 'pricetags' }
                ]
            },
            {
                titulo: 'Incluir',
                componentes: [
                    { titulo: 'Cliente', page: ClienteNovoPage, icone: 'podium' }
                ]
            }
        ];
        
        this._globals.setMenu(menu);
    }
}
