import { HttpClient } from '@angular/common/http';
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

	/* METODOS */
	/** Faz o login de usuário */
	logUserIn(usr, pwd){
		var url = Res.Urls.HOST + Res.Urls.LOGIN_USUARIO + 'usr='+ usr + '&pwd=' + pwd;
		return this.http.get(url);
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