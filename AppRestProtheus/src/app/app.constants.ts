/** 
 * Conjunto de Constantes para uso no App 
 * 
 * Explicação de Urls: https://gitlab.com/brunoleocoelho/restprotheus/blob/master/Readme.md
 */
export const Res = {
    /** Strings comuns usadas no app */
    Strings: {
        confirmar:"Confirmar",
        cancelar:"Cancelar"
    },
    /** Strings das URLs usadas */
    Urls: {
        /**URL BASE REST DO HOST */
        /** URL com IP, porta e destino da conexão com o serviço REST */
        HOST: "http://10.0.0.108:8624/rest",
        
        /**USUARIOS */
        /** Deve-se incluir parametros 'usr' e 'pwd' */
        LOGIN_USUARIO: "/loginuser",

        /** PRODUTOS */
        
        /** Traz apenas um produto, sendo necessario passar seu codigo após url */
        PRODUTO_DETALHE: "/produtos/",           //substituido '?tipo=1'
        /** Lista todos os produtos ativos na base */
        PRODUTO_TODOS_ATIVOS: "/produtos/lista", //substituido '?tipo=2'
        /** Deve-se incluir parametro 'codprod' */
        PRODUTO_ALTERA: "/produtos?tipo=4",        

        PRODUTOOPCOES_TODOS: "/ProdutoOpcoes",
        PRODUTOOPCOES_TIPOS: "/ProdutoOpcoes?busca=1",
        PRODUTOOPCOES_GRUPOS: "/ProdutoOpcoes?busca=2",
        PRODUTOOPCOES_ARMAZENS: "/ProdutoOpcoes?busca=3",

        /** CLIENTES */
        
        /** Deve-se incluir 'codcliente' a ser buscado (obrigatorio) */
        CLIENTE_DETALHE: "/clientes?",
        /** Lista todos os clientes ativos na base */
        CLIENTE_TODOS_ATIVOS: "/clientes/lista",
        /** Dados passados como objeto JSON via POST HTTP_BODY, conforme classe Cliente.
         * 
         * São obrigatorios os seguintes campos:
         * FILIAL (passar nulo), COD (passar nulo), LOJA (passar nulo), NOME, NREDUZ, END, TIPO, EST, MUN, e CGC
        */
        CLIENTE_INCLUIR: "/clientes/incluir",
        /** Um Objeto CLIENTE é passado como objeto JSON via PUT HTTP_BODY.
         * 
         * São obrigatorios os seguintes campos para buscar cliente p/ ALTERAÇÂO:
         * FILIAL, COD, LOJA
         * 
         * Os campos que não sofrerem alteração devem ser passados nulo.
        */
        CLIENTE_ALTERAR: "/clientes/alterar",

        
        /** PEIDOS DE VENDA */

        /** Dados passados como objeto JSON via POST HTTP_BODY, conforme classe PedidoVenda
         * Para inclusão de um novo Pedido de venda na base
         */
        PEDIDOVENDA_INCLUIR: "/pedidovenda/novo"

    }    
}

/* Para Testes

        HOST: "http://localhost/restprotheus/Fontes",
        PRODUTO_TODOS_ATIVOS: "/Produtos/index.php",
        CLIENTE_TODOS_ATIVOS: "/Clientes/index.php",
        LOGIN_USUARIO: "/Usuarios/index.php?",
    
    Estados: {
        AC: "Acre"                ,
        AL: "Alagoas"             , 
        AP: "Amapá"               , 
        AM: "Amazonas"            , 
        BA: "Bahia"               , 
        CE: "Ceará"               , 
        DF: "Distrito Federal"    , 
        ES: "Espírito Santo"      , 
        GO: "Goiás"               , 
        MA: "Maranhão"            , 
        MT: "Mato Grosso"         , 
        MS: "Mato Grosso do Sul"  , 
        MG: "Minas Gerais"        , 
        PA: "Pará"                , 
        PB: "Paraíba"             , 
        PR: "Paraná"              , 
        PE: "Pernambuco"          , 
        PI: "Piauí"               , 
        RR: "Roraima"             , 
        RO: "Rondônia"            , 
        RJ: "Rio de Janeiro"      , 
        RN: "Rio Grande do Norte" , 
        RS: "Rio Grande do Sul"   , 
        SC: "Santa Catarina"      , 
        SP: "São Paulo"           , 
        SE: "Sergipe"             , 
        TO: "Tocantins"           
    },


*/

  
  

