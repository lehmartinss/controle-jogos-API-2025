/**********************************************************************************************
 * Objetivo: Controller responsavel pela regra de negocio do CRUD do jogo 
 * Data: 13/02/205
 * Autor: Marcel
 * Versão: 1.0
 *********************************************************************************************/

// Import do arquivo de configuração para message e status code 
const MESSAGE = require('../../modulo/config.js')

//Import do DAO para realizar o CRUD  no BD
const jogoDAO = require('../../model/DAO/jogo.js')


 // Função para inserir um novo jogo
 const inserirJogo = async function(jogo){
   if(
        jogo.nome            == undefined || jogo.nome            == '' || jogo.nome            == null || jogo.nome.length > 80 ||
        jogo.data_lancamento == undefined || jogo.data_lancamento == '' || jogo.data_lancamento == null || jogo.data_lancamento.length > 10 ||
        jogo.versao          == undefined || jogo.versao          == '' || jogo.versao          == null || jogo.versao.length > 10 ||
        jogo.tamanho         == undefined || jogo.tamanho == '' || jogo.tamanho.length > 10 ||
        jogo.descricao       == undefined || jogo.descricao == '' ||
        jogo.foto_capa       == undefined || jogo.foto_capa.length > 200 ||
        jogo.link            == undefined || jogo.link.length > 200
   ){
      return MESSAGE.ERROR_REQUIRED_FIELDS //400
   }else{
      // Encaminha os dados do novo jogo para ser inserido no BD 
      let resultJogo = await jogoDAO.insertJogo(jogo)

      if(resultJogo)
         return MESSAGE.SUCESS_CREATED_ITEM //201
      else
      return MESSAGE.ERROR_INTERNAL_SERVER //500


   }
}


 // Função para atualizar um novo jogo 
 const atualizarJogo = async function(){

}

// Função para excluir um novo jogo 
const excluirJogo = async function(){

}

// Função para retornar todos os jogo
const listarJogo = async function(){

}

// Função para buscar um jogo
const buscarJogo = async function(){

}

module.exports = {
inserirJogo,
atualizarJogo,
excluirJogo,
listarJogo,
buscarJogo
}