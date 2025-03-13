/***********************************************************************************************************
 * Objetivo: Arquivo de padronização de mensagens e status code para o projeto 
 * Data: 20/02/2025
 * Autor: Marcel
 * Versão: 1.0
 * **********************************************************************************************************/
/***********************************************************************************************************
 * 
 * 
 ******************************************* MENSAGENS DE ERRO *********************************************************************************************************************************************************************/
const ERROR_REQUIRED_FIELDS            = {status: false, status_code: 400, message: " Existem campos obrigatórios que não foram preenchidos ou ultrapassaram a quantidade de caracteres. A requisição não podem ser realizados"}
const ERROR_INTERNAL_SERVER_CONTROLLER = {status: false, status_code: 500, message: " Não foi possivel processar a requisoção, pois ocorreram erros internos no servidor da CONTROLLER!"}
const ERROR_INTERNAL_SERVER_MODEL      = {status: false, status_code: 500, message: " Não foi possivel processar a requisoção, pois ocorreram erros internos no servidor da MODEL!"}
const ERROR_CONTENT_TYPE               = {status: false, status_code: 415, message: "Não foi possivel processar a requisição, pois o formado de dados encaminhado não é suportado pelo servidro. Favor encaminar apenas JSON"}
const ERROR_NOT_FOUND                  = {status: false, status_code: 404, message: "Não foram encontrados itens para retornar"}
const ERROR_NOT_DELETE                 = {status: false, status_code: 400, message: "Não foi possivel deletar por relação de outras tabelas"}
/******************************************** MENSAGENS DE SUCESSO ************************************************************************/
 const SUCESS_CREATED_ITEM = {status: true, status_code: 201, message: "Item criado com sucesso"}
 const SUCESS_DELETE_ID    = {status: true, status_code: 200, message: "ID deletado com sucesso"}
 const SUCESS_UPDATE_ITEM    = {status: true, status_code: 200, message: "Item atualizado com sucesso"}


module.exports ={
    ERROR_REQUIRED_FIELDS,
    SUCESS_CREATED_ITEM, 
    ERROR_INTERNAL_SERVER_CONTROLLER,
    ERROR_INTERNAL_SERVER_MODEL,
    ERROR_NOT_FOUND,
    ERROR_CONTENT_TYPE,
    ERROR_NOT_DELETE,
    SUCESS_DELETE_ID,
    SUCESS_UPDATE_ITEM
}