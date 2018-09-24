import { Injectable } from "@angular/core";
import { Usuario } from "../models/usuario";

@Injectable()
export class AppGlobals{
    public usuario: Usuario;
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
}