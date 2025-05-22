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
const  controllerJogoDesenvolvedor = require('../jogo/controllerJogoDesenvolvedor.js')
const controllerJogoIdioma = require('../jogo/controllerJogoIdioma.js')

 // Função para inserir um novo jogo
 const inserirJogo = async function(jogo, contentType){
   try {
      if(contentType == 'application/json'){

   
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
      console.log(jogo);
      

      if(resultJogo)
         return MESSAGE.SUCESS_CREATED_ITEM //201
      else
      return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500


   }
   }else{
      return MESSAGE.ERROR_CONTENT_TYPE //415
   }

} catch (error) {
      return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
}
}

 // Função para atualizar um novo jogo 
 const atualizarJogo = async function(jogo,id,contentType){
   try {
      if(contentType == 'application/json'){

         if(
              jogo.nome            == undefined || jogo.nome            == ''    || jogo.nome            == null || jogo.nome.length > 80 ||
              jogo.data_lancamento == undefined || jogo.data_lancamento == ''    || jogo.data_lancamento == null || jogo.data_lancamento.length > 10 ||
              jogo.versao          == undefined || jogo.versao          == ''    || jogo.versao          == null || jogo.versao.length > 10 ||
              jogo.tamanho         == undefined || jogo.tamanho         == ''    || jogo.tamanho.length > 10     ||
              jogo.descricao       == undefined || jogo.descricao       == ''    ||
              jogo.foto_capa       == undefined || jogo.foto_capa.length > 200   ||
              jogo.link            == undefined || jogo.link.length > 200        ||
              id                   == undefined || id                   == ''    || id == null                   || isNaN(id)                || id<=0

         ){
            return MESSAGE.ERROR_REQUIRED_FIELDS //400
         }else{
            //Validar se o ID existe no BD
            let resultJogo = await buscarJogo(parseInt(id))

            if(resultJogo.status_code == 200){
               //Update
               //Adiciona um atributo ID no JSON para encaminhar ID da requisição
               jogo.id = parseInt(id)
               console.log(jogo);
               
               let result = await jogoDAO.updateJogo(jogo)

               if(result){
                  return MESSAGE.SUCESS_UPDATE_ITEM //200
               }else{
                  return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
               }

            }else if(resultJogo.status_code == 404){
               return MESSAGE.ERROR_NOT_FOUND //404
            }else{
               return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
            }
         }
      }else{
         return MESSAGE.ERROR_CONTENT_TYPE // 415
      }

   } catch (error) {
      return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
   }
}

// Função para excluir um novo jogo 
const excluirJogo = async function(id){
   try {

      if(id == undefined || id ==  '' || isNaN(id)){
         return MESSAGE.ERROR_REQUIRED_FIELDS
      }

      if(id){
         let verificacao = await jogoDAO.selectByIdJogo(id)
         let resultJogo = await jogoDAO.deleteJogo(id)

         if (verificacao!= false || typeof(verificacao) == 'object'){

            if(verificacao.length > 0){
               if(resultJogo){
                  return MESSAGE.SUCESS_DELETE_ID
               }else{
                  return MESSAGE.ERROR_NOT_DELETE
               }
            }else{
               return MESSAGE.ERROR_NOT_FOUND // 404
            }
            }else{
            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL // 500
            }
      }
   } catch (error) {
      return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER // 500
   }
}

// Função para retornar todos os jogo
const listarJogo = async function(){

   try {

      let dadosJogos = {}

       //Chama a função para retornar os dados do jogo 
   let resultJogo = await jogoDAO.selectAllJogo()

   if (resultJogo != false || typeof(resultJogo) == 'object'){

   if(resultJogo.length > 0){
      dadosJogos.status = true
      dadosJogos.status_code = 200
      dadosJogos.items = resultJogo.length
      let listaJogo = []

      for(jogos of resultJogo){
      /**** RETORNA OS DADOS DO DESENVOLVEDOR PARA COLOCAR NO RETORNO DO JOGO *****/
         let dadosDesenvolvdor = await controllerJogoDesenvolvedor.buscarDesenvolvedorPorJogo(jogos.id)
         jogos.Desenvolvedor = dadosDesenvolvdor.Desenvolvedor

          /**** RETORNA OS DADOS DO IDIOMA PARA COLOCAR NO RETORNO DO JOGO *****/
         let dadosIdiomas = await controllerJogoIdioma.buscarIdiomaPorJogo(jogos.id)
         jogos.Idiomas = dadosIdiomas.Idiomas
         listaJogo.push(jogos)
      }
      dadosJogos.games = listaJogo

      return dadosJogos //200
   }else{
      return MESSAGE.ERROR_NOT_FOUND // 404
   }
   }else{
   return MESSAGE.ERROR_INTERNAL_SERVER_MODEL // 500
   }
   } catch (error) {      
      return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER // 500
   }
   

}

// Função para buscar um jogo
const buscarJogo = async function(id){
   try {
      let dadosJogos = {}

      if(id == undefined || id ==  '' || isNaN(id)){
         return MESSAGE.ERROR_REQUIRED_FIELDS
      }

      let resultJogo = await jogoDAO.selectByIdJogo(id)

      if (resultJogo != false || typeof(resultJogo) == 'object'){
         if(resultJogo.length > 0){
            dadosJogos.status = true
            dadosJogos.status_code = 200
            dadosJogos.items = resultJogo.length
            dadosJogos.games = resultJogo
      
            return dadosJogos //200
         }else{
            return MESSAGE.ERROR_NOT_FOUND // 404
         }
         }else{
         return MESSAGE.ERROR_INTERNAL_SERVER_MODEL // 500
         }
      
   } catch (error) {
      return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER // 500
   }
}

module.exports = {
inserirJogo,
atualizarJogo,
excluirJogo,
listarJogo,
buscarJogo
}