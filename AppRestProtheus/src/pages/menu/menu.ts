import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ClientesPage } from '../clientes/clientes';
import { PedidosVendaPage } from '../pedidos-venda/pedidos-venda';
import { ProdutosPage } from '../produtos/produtos';
import { ClienteNovoPage } from '../cliente-novo/cliente-novo';
import { AppGlobals } from "../../app/app.globals";

/**
 * Generated class for the MenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-menu',
    templateUrl: 'menu.html',
})
export class MenuPage {
    titulo: string = 'App Rest Protheus'
    menus: any[];

    constructor(public navCtrl: NavController, public navParams: NavParams, private _usuario: AppGlobals) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad MenuPage');
        this.menus = this._usuario.menus;
        // [
        //     {
        //         title: 'Consultar',
        //         componentes: [
        //             { title: 'Clientes', page: ClientesPage, icone: 'people' },
        //             { title: 'Pedidos de Venda', page: PedidosVendaPage, icone: 'open' },
        //             { title: 'Produtos', page: ProdutosPage, icone: 'pricetags' }
        //         ]
        //     },
		// 	{
		// 		title: 'Incluir',
		// 		componentes: [
		// 			{ title: 'Cliente', page: ClienteNovoPage, icone: 'podium' }
		// 		]
		// 	}
        // ];
    }

    /** Redireciona para a page correta */
    openPage(page) {
        this.navCtrl.push(page);
    }

}
