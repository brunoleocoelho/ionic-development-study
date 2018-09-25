import { Component, ApplicationModule } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppGlobals } from "../../app/app.globals";
import { ClientesPage } from "../clientes/clientes";

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

    constructor(public navCtrl: NavController, public navParams: NavParams, private _globals: AppGlobals) {
    }

    ionViewDidLoad() {
        // console.log('ionViewDidLoad MenuPage');
        // this.definirMenus();
        this.menus = this._globals.menus;
    }

    /** Redireciona para a page correta */
    openPage(page) {
        // console.log("MenuPage.openPage:", page);
        this.navCtrl.setRoot(page); //vai para pagina, mas considera como root page
        // this.navCtrl.push( page ); //navega p/ uma pagina, considerando voltar (aparece "<-BACK")
    }

}
