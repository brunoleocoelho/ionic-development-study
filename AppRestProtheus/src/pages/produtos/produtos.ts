import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ServiceRestProvider } from '../../providers/service-rest/service-rest';
import { HttpClientModule } from '@angular/common/http';

/**
 * Generated class for the ProdutosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@IonicPage()
@Component({
	selector: 'page-produtos',
	templateUrl: 'produtos.html',
})
export class ProdutosPage {
	dados: any;
	produtos: any;

	constructor(public navCtrl: NavController, public navParams: NavParams, private servico: ServiceRestProvider, private httpCliente: HttpClientModule, private loadingCtrl: LoadingController) {
		this.loadProdutos();
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad ProdutosPage');
	}

	loadProdutos(){
		this.presentLoading();
		this.servico.getProdutosLista().subscribe(
			ok =>{
				console.log("ProdutosPage:loadProdutos:ok", ok);
				this.dados = ok;
				this.fillProdutos()				
			},
			err => console.log("ProdutosPage:loadProdutos:err", err)
		)
	}

	/** Preenche a o array de produtos */
	fillProdutos(){
		if (this.dados.Descricao == "OK") {
			this.produtos = this.dados.Produtos;
		}
	}

	/** Exibe um elemtento loading */
	presentLoading() {
		const loader = this.loadingCtrl.create({
			content: '<ion-spinner name="crescent">Carregando...</ion-spinner>',
			duration: 1000
		});
		loader.present();
	}

	/** Abre pagina com detelhes do produto */
	verDetalhesProduto(produto){
		console.log("verDetalhesProduto(prod): ", produto);
	}

	/**	Abre formulário para adicionar produto na base */
	addNovoProduto(){
		console.log("Clicou addNovoProduto()")
	}
}
