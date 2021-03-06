import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Res } from '../../app/app.constants';
import { AppGlobals } from "../../app/app.globals";

/*
  Generated class for the ServiceRestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServiceRestProvider {
    //public user: string = "";

	/** CONSTRUTOR */
	constructor(public http: HttpClient, private _globals: AppGlobals) {
		console.log('ServiceRestProvider Provider');
	}

	// /* METODOS */
	// /** Fazendo o login de usuário com HTTP POST
    //  * 
    //  * Referência: https://stackoverflow.com/questions/45894628/angular-4-3-httpclient-basic-authorization-not-working
    // */
	// logUserIn(usr, pwd){
    //     let url = Res.Urls.HOST + Res.Urls.LOGIN_globals ; // + 'usr='+ usr + '&pwd=' + pwd;
    //     const body = JSON.stringify({usr: usr, pwd: pwd});
    //     let headers = new HttpHeaders();
    //     headers.append("Authorization","Basic "+ btoa("usr:pwd"));
	// 	return this.http.post(
    //         url,
    //         body,
    //         { headers:headers }
    //     )
	// }

    /** Fazendo o login de usuário com HTTP GET
     * Referências: 
     * * https://forum.ionicframework.com/t/adding-authorization-header-in-get-request/91222
     * * https://angularfirebase.com/lessons/http-with-angular-quick-start/                 
    */
    logUserIn(usr, pwd){
        let url = Res.Urls.HOST + Res.Urls.LOGIN_USUARIO  + '?usr='+ usr + '&pwd=' + pwd;
        let headers = new HttpHeaders().set('Authorization','Basic '+ btoa( usr +':'+ pwd ));
        return this.http.get( url, { headers });
	}

	/** Recupera da base todos os clientes ativos */
	getClientesTodos() {
		let url = Res.Urls.HOST + Res.Urls.CLIENTE_TODOS_ATIVOS;
		let headers = new HttpHeaders().set('Authorization','Basic '+ this._globals.getAuth());
		return this.http.get(url, { headers });
	}

	/** Envia alteração de um cliente */
	putClientesAlterar(cliente) {
        let url = Res.Urls.HOST + Res.Urls.CLIENTE_ALTERAR;
		let headers = new HttpHeaders().set('Authorization','Basic '+ this._globals.getAuth());
        
		return this.http.put(
			url,
			cliente,
			{ responseType: 'json', headers }
		);
	}

	/** Envia um novo cliente no corpo do HTTP, incluindo na base de dados no server */
	postClienteIncluir(cliente){
        let url = Res.Urls.HOST + Res.Urls.CLIENTE_INCLUIR;
		let headers = new HttpHeaders().set('Authorization','Basic '+ this._globals.getAuth());
        
		return this.http.post(
			url,
			cliente,
			{ responseType: 'json', headers }					
		);
	}

	/** Carrega lista de produtos ativos */
	getProdutosLista(){
        let url = Res.Urls.HOST + Res.Urls.PRODUTO_TODOS_ATIVOS;
		let headers = new HttpHeaders().set('Authorization','Basic '+ this._globals.getAuth());        
		return this.http.get(url, { headers });
    }

    /** Envia alterações feitas em um produto para a base de dados no server*/
    putProdutoAlterar(produto){
        let url = Res.Urls.HOST + Res.Urls.PRODUTO_ALTERA;
        let headers = new HttpHeaders().set('Authorization', 'Basic'+ this._globals.getAuth());
        //base não possui PUT implementado, está enviando como POST
        return this.http.post(
            url, 
            produto, 
            { responseType: 'json', headers }
        );
    }
    
    /** Inclue um novo pedido de venda na base */
    postPedidoVendaNovo(pedido){
        let url = Res.Urls.HOST + Res.Urls.PEDIDOVENDA_INCLUIR;
		let headers = new HttpHeaders().set('Authorization','Basic '+ this._globals.getAuth());

        return this.http.post(
            url,
            pedido,
            { responseType: 'json', headers }
        )
    }

    /** Busca os grupos, tipos, e armazens de produtos cadastrados no server */
    getOpcoesProdutos(){
        let url = Res.Urls.HOST + Res.Urls.PRODUTOOPCOES_TODOS;
        let headers = new HttpHeaders().set('Authorization','Basic '+ this._globals.getAuth());
        return this.http.get(url, {headers});
    }
}
/** CRIAÇÃO DE UM PROVIDER COM USO DE HTTP EXIGE OS PROCEDIMENTOS:
 * 
 * 1- Provider é gerado via Terminal:
 * 		ex: ionic generate provider ServiceCliente
 * 
 * 2- Arquvio 'service-cliente.ts' será gerado na pasta 'providers/service-cliente'
 * 
 * 3- Arquivos afetados:
 * 		- app.module.ts: importar serviço no topo, e declará-lo em providers. Para o HTTP, importar o 'HttpClientModule', e declarar em imports
 * 		- page-home.ts: devem ser importados e declarados o provider 'ServiceClienteProvider' e o 'HttpClientModule'
 * 
 */