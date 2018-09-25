import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading } from 'ionic-angular';
import { ServiceRestProvider } from '../../providers/service-rest/service-rest';
import { HttpClientModule } from '@angular/common/http';
import { Produto } from '../../models/produto';
import { ProdutoDetalhesPage } from '../produto-detalhes/produto-detalhes';

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
	loader: Loading;
	dados: any;
	produtos: any;

	constructor(public navCtrl: NavController, public navParams: NavParams, private servico: ServiceRestProvider, private httpCliente: HttpClientModule, private loadingCtrl: LoadingController) {
		this.loadProdutos();
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad ProdutosPage');
	}

	/** Carrega os produtos ativos da base */
	loadProdutos(){
		this.createLodaing();
		this.loader.present();
		this.servico.getProdutosLista().subscribe(
			ok =>{
				console.log("ProdutosPage:loadProdutos:ok", ok);
				this.dados = ok;
				this.fillProdutos()				
				this.loader.dismiss();
			},
			err =>{
				console.log("ProdutosPage:loadProdutos:err", err)
				this.loader.dismiss();
			}
		)
	}

	/** Preenche a o array de produtos */
	fillProdutos(){
		if (this.dados.Descricao == "OK") {
			this.produtos = this.dados.Produtos;
		}
	}

	/** Exibe um elemento loading */
	createLodaing() {
		this.loader = this.loadingCtrl.create({
			spinner: 'crescent',
			content: 'Carregando...'//'<ion-spinner name="crescent">Carregando...</ion-spinner>'
			// duration: 1000
		});		
	}

	/** Abre pagina com detelhes do produto */
	verDetalhesProduto(produto: Produto){
        // console.log("verDetalhesProduto(prod): ", produto);
        this.navCtrl.push(ProdutoDetalhesPage, {produto: produto}); // navega para detalhes do produto (c/ back button ativado) passando um Produto
	}

	/**	Abre formulário para adicionar produto na base */
	addNovoProduto(){
        console.log("Clicou addNovoProduto()")
        // this.navCtrl.push(page);
	}
}
