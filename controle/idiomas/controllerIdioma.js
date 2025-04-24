// Import do arquivo de configuração para message e status code 
const MESSAGE = require('../../modulo/config.js')

//Import do DAO para realizar o CRUD  no BD
const idiomaDAO = require('../../model/DAO/idioma.js')

 // Função para inserir um novo idioma
 const inserirIdioma = async function(idioma, contentType){
   try {
      if(contentType == 'application/json'){

   
   if(
        idioma.idioma            == undefined || idioma.idioma            == '' || idioma.idioma            == null || idioma.idioma.length > 45

   ){
      return MESSAGE.ERROR_REQUIRED_FIELDS //400
   }else{
      // Encaminha os dados do novo idioma para ser inserido no BD 
      let resultIdioma = await idiomaDAO.insertIdioma(idioma)

      if(resultIdioma)
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

 // Função para atualizar um novo idioma
 const atualizarIdioma = async function(idioma,id,contentType){
   try {
      if(contentType == 'application/json'){

         if(
            idioma.idioma            == undefined || idioma.idioma            == ''    || idioma.idioma           == null || idioma.idioma.length > 45 ||
              id                   == undefined || id                   == ''    || id == null                   || isNaN(id)                || id<=0

         ){
            return MESSAGE.ERROR_REQUIRED_FIELDS //400
         }else{
            //Validar se o ID existe no BD
            let resultIdioma = await buscarIdioma(parseInt(id))

            if(resultIdioma.status_code == 200){
               //Update
               //Adiciona um atributo ID no JSON para encaminhar ID da requisição
               idioma.id = parseInt(id)
               let result = await idiomaDAO.updateIdioma(idioma)

               if(result){
                  return MESSAGE.SUCESS_UPDATE_ITEM //200
               }else{
                  return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
               }

            }else if(resultIdioma.status_code == 404){
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

// Função para excluir um novo idioma
const excluirIdioma = async function(id){
   try {

      if(id == undefined || id ==  '' || isNaN(id)){
         return MESSAGE.ERROR_REQUIRED_FIELDS
      }

      if(id){
         let verificacao = await idiomaDAO.selectByIdIdioma(id)
         let resultIdioma = await idiomaDAO.deleteIdioma(id)

         if (verificacao!= false || typeof(verificacao) == 'object'){

            if(verificacao.length > 0){
               if(resultIdioma){
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

// Função para retornar todos os idiomas
const listarIdioma = async function(){

   try {
      let dadosIdiomas = {}

       //Chama a função para retornar os dados do idioma
   let resultIdioma = await idiomaDAO.selectAllIdioma()

   if (resultIdioma != false || typeof(resultIdioma) == 'object'){

   if(resultIdioma.length > 0){
    dadosIdiomas.status = true
    dadosIdiomas.status_code = 200
    dadosIdiomas.items = resultIdioma.length
    dadosIdiomas.Idiomas = resultIdioma

      return dadosIdiomas //200
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

// Função para buscar um idioma
const buscarIdioma = async function(id){
   try {
      let dadosIdiomas = {}

      if(id == undefined || id ==  '' || isNaN(id)){
         return MESSAGE.ERROR_REQUIRED_FIELDS
      }

      let resultIdioma = await idiomaDAO.selectByIdIdioma(id)

      if (resultIdioma != false || typeof(resultIdioma) == 'object'){

         if(resultIdioma.length > 0){
            dadosIdiomas.status = true
            dadosIdiomas.status_code = 200
            dadosIdiomas.items = resultIdioma.length
            dadosIdiomas.Idiomas= resultIdioma
      
            return dadosIdiomas //200
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
    inserirIdioma,
    atualizarIdioma,
    excluirIdioma,
    listarIdioma,
    buscarIdioma
}