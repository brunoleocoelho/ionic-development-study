webpackJsonp([0],{

/***/ 112:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 112;

/***/ }),

/***/ 154:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 154;

/***/ }),

/***/ 197:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_in_app_browser__ = __webpack_require__(277);
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
//DECLARATION




//DECORATION
var HomePage = (function () {
    /* CONSTRUTOR */
    function HomePage(navCtrl, navParams, httpClient, loadingCtrl, actionSheetCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.httpClient = httpClient;
        this.loadingCtrl = loadingCtrl;
        this.actionSheetCtrl = actionSheetCtrl;
        this.baseUrl = "https://newsapi.org/v2/";
        this.url = '';
        //Parametros de requisição
        this.apiKey = "1039b9dd81c5405ca86d666b1897b393";
        this.options = ["top-headlines", "everything"];
        this.query = '';
        this.filtroAtivo = false; //true para filtro ativo
        this.filtroAtivo = false;
        this.sources = [];
        this.exibeProgresso();
    }
    /* METODOS */
    // Exibe o progresso enquanto carrega o conteudo a ser exibido
    HomePage.prototype.exibeProgresso = function () {
        var progressRing = this.loadingCtrl.create({
            content: 'Verificando Notícias!'
        });
        this.loadNews();
        progressRing.dismiss();
    };
    // Ao clicar sobre um item da lista, redireciona p/ webpage da url recebida
    HomePage.prototype.itemSelected = function (urlExt) {
        var browser = new __WEBPACK_IMPORTED_MODULE_3__ionic_native_in_app_browser__["a" /* InAppBrowser */]();
        browser.create(urlExt, '_system');
    };
    // Carrega as noticias
    HomePage.prototype.loadNews = function () {
        var _this = this;
        //Limpando filtros
        this.filtroAtivo = false;
        this.sources = [];
        //preenchendo url
        this.url = this.baseUrl + this.options[0] + "?";
        if (this.query.length > 0) {
            this.url += "q=" + this.query;
        }
        else {
            this.url += 'country=br';
        }
        this.url += "&apiKey=" + this.apiKey;
        console.log("loadNews url: ", this.url);
        //requisitando dados da API através da url
        this.newsObs = this.httpClient.get(this.url);
        this.newsObs.subscribe(function (data) {
            if (data['status'] == 'ok') {
                console.log('loadNews variable newsObs: ', _this.newsObs);
                console.log('loadNews data: ', data);
                _this.noticias = data['articles'];
                console.log('loadNews noticias: ', _this.noticias);
                _this.statusFlag = data['status'];
                console.log('loadNews status: ', _this.statusFlag);
            }
            //passando a lista de noticias para lista auxiliar 'semFilter'
            _this.semFilter = _this.noticias;
            //OU FAZER DIRETO AO OBJETO JSON ARTICLES DESEJADO
            // this.httpClient.get(this.url).subscribe(data => {      
            //   console.log( 'my data: ', data['articles']);
            //   this.newsObs = data['articles'];
            // })
        });
    };
    // Metodo chamado quando input de busca é escrito.
    // Recarregando a lista de noticias conforme busca do usuário 
    // Busca é realizada a cada multiplo de 2 letras digitadas
    HomePage.prototype.updateNews = function (e) {
        //this.query = e.srcElement.value != null ? e.srcElement.value : ""; // e.srcElement.value é o valor do input da pesquisa
        var tipoInput = e.inputType;
        var modLetters = (this.query.length) % 2;
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
    };
    // Aplica o filtro na lista exibida na tela pela fonte da notícia
    HomePage.prototype.showFilters = function () {
        var _this = this;
        //Primeiro eliminar as fontes de noticias repetidas
        if (!this.filtroAtivo) {
            var srcNews_1 = []; //array auxiliar
            for (var i_1 = 0; i_1 < this.noticias.length; i_1++) {
                var fnt = this.noticias[i_1]['source'].name;
                srcNews_1.push(fnt);
                this.sources = srcNews_1.filter(function (elem, pos) { return srcNews_1.indexOf(elem) == pos; });
            }
        }
        // console.log('srcNews: ', srcNews);
        console.log('showFilters sources: ', this.sources);
        //criando o actionSheet, começando pelo titulo
        //ActionSheet é a brra 
        var actionSheet = this.actionSheetCtrl.create({ title: 'Filtrar Fonte de Notícias' });
        //criando os botões de filtro e adicionando
        //para cada fonte de noticias criar um botão
        for (var i = 0; i < this.sources.length; i++) {
            var button = {
                text: this.sources[i],
                handler: MyFunction.bind(this, i)
            };
            actionSheet.addButton(button);
        }
        //função local para fltragem 
        function MyFunction(n) {
            var _this = this;
            this.filtroAtivo = true;
            this.filtro = this.sources[n];
            var listaFiltro = this.semFilter.filter(function (elem, idx) { return _this.filtro === elem.source.name; });
            console.log('showFilters var listaFiltro: ', listaFiltro);
            this.noticias = listaFiltro;
            //console.log('showFilters noticiasFiltrado: ', this.noticias);
        }
        //adicionando botão de cancelar
        actionSheet.addButton({
            text: 'Cancelar Filtro',
            role: 'cancel',
            handler: function () {
                _this.noticias = _this.semFilter;
                _this.filtroAtivo = false;
                console.log('noticiasCanc: ', _this.noticias);
            }
        });
        actionSheet.present();
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/home/brunoleocoelho/Documentos/IONIC Projects/MyReader/src/pages/home/home.html"*/'<ion-header>\n  <ion-navbar color="primary">\n    <ion-title>News Reader</ion-title>\n    <ion-buttons end> \n      <!-- atributo "end" indica que botão será posicionado à direita -->\n      <!-- atributo "start" posicionaria o botão à esquerda -->\n      <button ion-button icon-only (click)="showFilters()" >\n          <span [style.color]="filtroAtivo ? \'orange\' : \'inherit\'"> {{ filtroAtivo ? filtro : "Filtrar" | lowercase }} </span>\n          <ion-icon name="funnel" [style.color]="filtroAtivo ? \'orange\' : \'inherit\'"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n  <ion-searchbar placeholder="Busca" (ionInput)="updateNews($event)" item-down [(ngModel)]="query"></ion-searchbar>  \n</ion-header>\n\n<ion-content>  \n  \n  <ion-list *ngIf=\'statusFlag == "ok" && noticias.length > 0; else semConteudo\'>    \n    <!-- <button ion-item *ngFor="let feed of (news | async)?.articles" (click)="itemSelected(feed.url)"> -->\n    <button ion-item *ngFor="let feed of noticias" (click)="itemSelected(feed.url)">\n      <!-- incluir eventos html dentro de parênteses é chamado de "Event Binding" no Angular.  -->\n      <ion-thumbnail  item-left>        \n          <img *ngIf="feed.urlToImage; else imgAlternative" [src]="feed.urlToImage">\n          <ng-template #imgAlternative>\n            <img src="assets/imgs/logo.png" alt="{{ feed.title }}">\n          </ng-template>\n        <!-- atributo \'src\' com colchetes se chama "Property Binding" para atribuir uma propriedade da view ao valor de uma expressão -->\n      </ion-thumbnail>\n      <h2>{{ feed.title }}</h2>\n      <p>{{feed.source.name}}</p>\n    </button>\n  </ion-list>\n\n  <ng-template #semConteudo>\n    <h2 class="center">Conteúdo indisponível</h2>\n    <!-- <p>{{ data.message }}</p> -->\n    <p>{{ statusFlag }}</p>\n  </ng-template>\n\n  <!-- <ion-infinite-scrool (ionInfinite)=\'buscaMaisInfinito($event)\'>\n    <ion-infinite-scrool-content loadingText=\'Carregando mais notícias...\'></ion-infinite-scrool-content>\n  </ion-infinite-scrool> -->\n</ion-content>'/*ion-inline-end:"/home/brunoleocoelho/Documentos/IONIC Projects/MyReader/src/pages/home/home.html"*/
        })
        //DEFINITION
        ,
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 199:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(221);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 221:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(194);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(271);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_home_home__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_common_http__ = __webpack_require__(198);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








// import { InAppBrowser } from '@ionic-native/in-app-browser'; //pluging que possibilita abrir links em navegador externo
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_7__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */], {}, {
                    links: []
                })
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] }
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 271:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(194);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(197);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/home/brunoleocoelho/Documentos/IONIC Projects/MyReader/src/app/app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"/home/brunoleocoelho/Documentos/IONIC Projects/MyReader/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ })

},[199]);
//# sourceMappingURL=main.js.map