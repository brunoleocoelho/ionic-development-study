import { Injectable } from "@angular/core";
import { Usuario } from "../models/usuario";
import { ClientesPage } from "../pages/clientes/clientes";
import { PedidosVendaPage } from "../pages/pedidos-venda/pedidos-venda";
import { ProdutosPage } from "../pages/produtos/produtos";
import { ClienteNovoPage } from "../pages/cliente-novo/cliente-novo";

@Injectable()
export class AppGlobals{
    public usuario: Usuario;
    public menus: [];
    private pwd;

    //Define o objeto usuario logado
    public setUsuario(usr: Usuario){
        this.usuario = usr;
    }

    //Para retornar o objeto usuario logado
    public getusuario(){
        return this.usuario;
    }

    //armazena a senha do usuario
    setPwd(pwd){
        this.pwd = pwd;
    }

    //retorna uma string ecnriptografada em Base64
    public getAuth(){
        return btoa( this.usuario.USRNAME +':'+ this.pwd );
    }

    // definindo os itens do menu para o usuario
    public setMenu(menu){
        this.menus = menu;
    }
}