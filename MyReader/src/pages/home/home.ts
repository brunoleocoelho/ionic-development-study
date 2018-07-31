/*  APLICAÇÃO PARA CARREGAR NOTICIAS ATRAVÉS DA 'NEWS API'
	
	Documentação
		https://newsapi.org/docs/endpoints/top-headlines
		https://newsapi.org/docs/endpoints/everything

	Parametros da URL usados na app:
		apiKey=1039b9dd81c5405ca86d666b1897b393
		top-headlines 	usado para trazer descrições breves das noticias
		everything 		traz tudo até 5000 noticias
		q 				usado para passar o parametro de busca na API
		sources 		indica a fonte da noticia
		country			indica o pais que as noticias serão pesquisadas
		from=2017-12-08&to=2017-12-08 usado para estabelecer um periodo
	
	Exemplos:
		"https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=1039b9dd81c5405ca86d666b1897b393";
		"https://newsapi.org/v2/everything?q=bitcoin&sortBy=publishedAt&apiKey=1039b9dd81c5405ca86d666b1897b393";

	Outros serviços de noticias interessantes:
		REDDIT: "https://www.reddit.com/new.json";  
*/

//DECLARATION
import { Component } from '@angular/core';
import {
	NavController,
	NavParams,
	LoadingController, //usada para criar uma imagem de carregamento
	ActionSheetController
} from 'ionic-angular';
// import { Http } from '@angular/http';
// import {HttpClientModule} from '@angular/common/http';
// import 'rxjs/add/operator/map';
// import {enableProdMode} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { InAppBrowser } from '@ionic-native/in-app-browser'
import { InfiniteScroll } from 'ionic-angular/components/infinite-scroll/infinite-scroll';
import { Button } from 'ionic-angular/components/button/button';


//DECORATION
@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})


//DEFINITION
export class HomePage {

	/* VARIAVEIS */
	//OBSERVABLES you can cancel an observable or receive multiple return values
	public newsObs: 	Observable<any>;
	public noticias: 	string[];										//Array para as notícias
	public sources: 	string[];										//array para as fontes de noticias
	public statusFlag: 	string;
	public baseUrl: 	string = "https://newsapi.org/v2/";
	public url: 		string = '';
	//Parametros de requisição
	public apiKey: 		string = "1039b9dd81c5405ca86d666b1897b393";
	public options: 	string[] = ["top-headlines", "everything"];
	public query: 		string = '';
	// public fromDate: string = "2017-12-08";
	// public toDate: string = "2017-12-08";		
	
	//Parametros de filtragem
	public filtro: 		string;
	public semFilter: 	Array<any>;										//Array para auxiliar filtro de noticias
	public filtroAtivo: boolean = false;								//true para filtro ativo


	/* CONSTRUTOR */
	constructor(public navCtrl: NavController, public navParams: NavParams, public httpClient: HttpClient, public loadingCtrl: LoadingController, public actionSheetCtrl: ActionSheetController) {
		this.filtroAtivo = false;
		this.sources = [];
		this.exibeProgresso();
	}


	/* METODOS */
	// Exibe o progresso enquanto carrega o conteudo a ser exibido
	exibeProgresso(): void {
		let progressRing = this.loadingCtrl.create({
			content: 'Verificando Notícias!'
		});
		this.loadNews();
		progressRing.dismiss();
	}

	// Ao clicar sobre um item da lista, redireciona p/ webpage da url recebida
	itemSelected(urlExt: string): void {
		let browser = new InAppBrowser()
		browser.create(urlExt, '_system');
	}

	// Carrega as noticias
	private loadNews() {
		//Limpando filtros
		this.filtroAtivo = false;
		this.sources = [];
		//preenchendo url
		this.url = this.baseUrl + this.options[0] + "?";
		if (this.query.length > 0) {
			this.url += "q=" + this.query;
		} else {
			this.url += 'country=br';
		}
		this.url += "&apiKey=" + this.apiKey;

		console.log("loadNews url: ", this.url);

		//requisitando dados da API através da url
		this.newsObs = this.httpClient.get(this.url);
		this.newsObs.subscribe(data => {
			if (data['status'] == 'ok') {

				console.log('loadNews variable newsObs: ', this.newsObs);
				console.log('loadNews data: ', data);

				this.noticias = data['articles'];
				console.log('loadNews noticias: ', this.noticias);

				this.statusFlag = data['status'];
				console.log('loadNews status: ', this.statusFlag);

			}
			//passando a lista de noticias para lista auxiliar 'semFilter'
			this.semFilter = this.noticias;

			//OU FAZER DIRETO AO OBJETO JSON ARTICLES DESEJADO
			// this.httpClient.get(this.url).subscribe(data => {      
			//   console.log( 'my data: ', data['articles']);
			//   this.newsObs = data['articles'];
			// })
		})
	}

	// Metodo chamado quando input de busca é escrito.
	// Recarregando a lista de noticias conforme busca do usuário 
	// Busca é realizada a cada multiplo de 2 letras digitadas
	public updateNews(e) {
		//this.query = e.srcElement.value != null ? e.srcElement.value : ""; // e.srcElement.value é o valor do input da pesquisa
		var tipoInput = e.inputType;
		var modLetters = (this.query.length)%2
		switch (tipoInput) {
			case "insertText":
				if (!modLetters)
					this.exibeProgresso();				
				break;
			// case "deleteContentBackward":
			// 	this.exibeProgresso();
			default:
				this.exibeProgresso();
				break;
		}
		console.log("updateNews e.srcElement.value=", e.srcElement.value);
	}

	// Aplica o filtro na lista exibida na tela pela fonte da notícia
	showFilters(): void {
		//Primeiro eliminar as fontes de noticias repetidas
		if (!this.filtroAtivo) {
			let srcNews = []; //array auxiliar
			for (let i = 0; i < this.noticias.length; i++) {
				var fnt = this.noticias[i]['source'].name;
				srcNews.push(fnt);
				this.sources = srcNews.filter((elem, pos) => srcNews.indexOf(elem) == pos)
			}
		}

		// console.log('srcNews: ', srcNews);
		console.log('showFilters sources: ', this.sources);

		//criando o actionSheet, começando pelo titulo
		//ActionSheet é a brra 
		let actionSheet = this.actionSheetCtrl.create({ title: 'Filtrar Fonte de Notícias' });

		//criando os botões de filtro e adicionando
		//para cada fonte de noticias criar um botão
		for (var i = 0; i < this.sources.length; i++) {
			var button = {
				text: this.sources[i],
				handler: AplicaFiltro.bind(this, i)				
			}
			actionSheet.addButton(button);
		}
		
		//função local para fltragem 
		function AplicaFiltro(n):void {
			this.filtroAtivo = true;
			this.filtro = this.sources[n];
			var listaFiltro: any[] = this.semFilter.filter((elem, idx) => this.filtro === elem.source.name);
			console.log('showFilters var listaFiltro: ', listaFiltro);
			this.noticias = listaFiltro;
			//console.log('showFilters noticiasFiltrado: ', this.noticias);
		}

		//adicionando botão de cancelar
		actionSheet.addButton({
			text: 'Cancelar Filtro',
			role: 'cancel',
			handler: () => {
				this.noticias = this.semFilter;
				this.filtroAtivo = false;
				console.log('noticiasCanc: ', this.noticias);
			}
		});

		actionSheet.present();
	}

	// // Metodo usado para atualização automática da lista atravez de HTTP Request para older news
	// buscaMaisInfinito(infiniteScroll){
	//   let paramsUrl = (this.noticias.length > 0) ? this.noticias[this.noticias.length - 1].title : '';
	//   var aux = this.httpClient.get(this.antigos + paramsUrl)
	//   .subscribe(dados =>{
	//     this.noticias = this.noticias.concat(dados['articles']);
	//     console.log(this.noticias);
	//   })
	//   infiniteScroll.complete();
	// }

	// Abre o conteudo clicado em nova página do app
	// openDetails(noticia) {
	//   this.navCtrl.push('FilmDetailsPage', {noticia: noticia});
	// }

} 
