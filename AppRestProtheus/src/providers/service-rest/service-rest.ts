import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Res } from '../../app/app.constants';

/*
  Generated class for the ServiceRestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServiceRestProvider {
	//private url: string = "";

	/** CONSTRUTOR */
	constructor(public http: HttpClient) {
		console.log('Hello ServiceRestProvider Provider');
	}

	// /* METODOS */
	// /** Fazendo o login de usuário com HTTP POST
    //  * 
    //  * Referência: https://stackoverflow.com/questions/45894628/angular-4-3-httpclient-basic-authorization-not-working
    // */
	// logUserIn(usr, pwd){
    //     var url = Res.Urls.HOST + Res.Urls.LOGIN_USUARIO ; // + 'usr='+ usr + '&pwd=' + pwd;
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
        var url = Res.Urls.HOST + Res.Urls.LOGIN_USUARIO ; // + 'usr='+ usr + '&pwd=' + pwd;

        let headers = new HttpHeaders().set('Authorization','Basic '+ btoa( usr +':'+ pwd ));
               
        return this.http.get( url, { headers });
	}

	/** Recupera da base todos os clientes ativos */
	getClientesTodos() {
		var url = Res.Urls.HOST + Res.Urls.CLIENTE_TODOS_ATIVOS;
		return this.http.get(url);
	}

	/** Envia alteração de um cliente */
	putClientesAlterar(cliente) {
		var url = Res.Urls.HOST + Res.Urls.CLIENTE_ALTERAR;
		return this.http.put(
			url,
			cliente,
			{ responseType: 'json' }
		);
	}

	/** Envia um novo cliente no corpo do HTTP, incluindo na base do server */
	postClienteIncluir(cliente){
		var url = Res.Urls.HOST + Res.Urls.CLIENTE_INCLUIR;
		return this.http.post(
			url,
			cliente,
			{ responseType: 'json'}					
		);
	}

	/** Carrega lista de produtos ativos */
	getProdutosLista(){
		var url = Res.Urls.HOST + Res.Urls.PRODUTO_TODOS_ATIVOS;
		return this.http.get(url);
    }
    
    /** Inclue um novo pedido de venda na base */
    postPedidoVendaNovo(pedido){
        var url = Res.Urls.HOST + Res.Urls.PEDIDOVENDA_INCLUIR;
        return this.http.post(
            url,
            pedido,
            { responseType: 'json'}
        )
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