import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Produto } from '../../models/produto';
import { ServiceRestProvider } from '../../providers/service-rest/service-rest';
import { Res } from '../../app/app.constants';

/**
 * Generated class for the ProdutoDetalhesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-produto-detalhes',
    templateUrl: 'produto-detalhes.html',
})
export class ProdutoDetalhesPage {
    desabilitado: boolean = true;
    produto: Produto;
    dados: any;
    gruposProd: Array<any> = [];
    tiposProd: Array<any> = [];
    armazProd: Array<any> = [];

    constructor(public navCtrl: NavController, public navParams: NavParams, private serv: ServiceRestProvider, 
    private alertCtrl: AlertController) {
        this.fillData();
    }

    ionViewDidLoad() {
        // console.log('ionViewDidLoad ProdutoDetalhesPage');
    }

    /** Preenche os dados dos campos na tela */
    fillData() {
        this.produto = this.navParams.get('produto');
        // console.log("ProdutoDatalhes:", this.produto);
    }

    /** Habilita a edição do item na tela */
    habilitarEdicao() {
        if (this.desabilitado) {
            this.fillGrupos();
        }
        else {
            this.salvarEdicao();
        }
        this.desabilitado = !this.desabilitado;
    }

    /** Preesnche as variaveis gruposProd, tiposProd e armazProd c/ os grupos, tipos e armazens de produtos */
    fillGrupos() {
        // se uma das variaveis está vazia, as outras não foram preenchidas ainda
        if (this.gruposProd.length == 0) {
            this.serv.getOpcoesProdutos().subscribe(
                ok => {
                    this.dados = ok;
                    console.log("ProdutoDetalhes:getOpcoesProdutos:ok", this.dados);
                    this.gruposProd = this.dados.GrupoProduto;
                    this.tiposProd = this.dados.TipoProduto;
                    this.armazProd = this.dados.ArmazemProduto;
                },
                err => console.log("ProdutoDetalhes:getOpcoesProdutos:erro", err)
            )
        }
    }

    /** Salva a edição do produto, fazendo PUT Http para a base */
    salvarEdicao() {
        this.serv.putProdutoAlterar(this.produto).subscribe(
            resposta => console.log("ProdutoDetalhes:salvarEdicao:OK ", resposta),
            err => console.log("ProdutoDetalhes:salvarEdicao:Erro ", err)
        )
    }


    /** Exibe alerta de confirmação*/
    presentConfirm() {
        let alert = this.alertCtrl.create({
            title: 'Atenção!',
            message: 'Dados editados aqui serão perdidos.\nDeseja continuar?',
            buttons: [
                {
                    text: Res.Strings.cancelar,
                    role: 'cancel',
                    handler: () => { console.log('Cancelar clicado'); }
                },
                {
                    text: Res.Strings.confirmar,
                    handler: () => {
                        console.log('Confirmar ProdutoNovo clicado!');
                        // this.navCtrl.push(ProdutoNovo);
                    }
                }
            ]
        });
        alert.present();
    }
    
	/**	Abre formulário para adicionar produto na base */
	addNovoProduto(){
        console.log("Clicou addNovoProduto()")
        // this.navCtrl.push(page);
	}
}
