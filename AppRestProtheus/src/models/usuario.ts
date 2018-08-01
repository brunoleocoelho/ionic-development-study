/**
 * @name Usuario
 * @description
 * Classe que representa os dados de um USUARIO
 */
export class Usuario {
    NOME: string;
    USRNAME: string;
    ID: string;
    NIVELACESSO: number;
    BLOQUEIO: boolean;
    CARGO: string;
    DEPTO: string;
    DIASEXPIRA: number;
    DTVALD: string;
    EMAIL: string;
    GRUPOS: string[];

    /** CONSTRUTOR  */
    constructor() {
        this.NOME = '';
        this.USRNAME = '';
        this.ID = '';
        this.NIVELACESSO = null;
        this.BLOQUEIO = false;
        this.CARGO = '';
        this.DEPTO = '';
        this.DIASEXPIRA = 0;
        this.DTVALD = '';
        this.EMAIL = '';
        this.GRUPOS = [];
    }
}
