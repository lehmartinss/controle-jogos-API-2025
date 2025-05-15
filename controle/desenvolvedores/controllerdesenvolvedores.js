// Import do arquivo de configuração para message e status code 
const MESSAGE = require('../../modulo/config.js')

//Import do DAO para realizar o CRUD  no BD
const desenvolvedoresDAO = require('../../model/DAO/desenvolvedores.js')

// Função para inserir um novo desenvolvedor
 const inserirDesenvolvedores = async function(desenvolvedores, contentType){
   try {
      if(contentType == 'application/json'){

   
   if(
        desenvolvedores.nome            == undefined || desenvolvedores.nome            == '' || desenvolvedores.nome            == null || desenvolvedores.nome.length > 100 ||
        desenvolvedores.email           == undefined || desenvolvedores.email           == '' || desenvolvedores.email           == null || desenvolvedores.email.length > 50 ||
        desenvolvedores.cargo           == undefined || desenvolvedores.cargo          == '' || desenvolvedores.cargo            == null || desenvolvedores.cargo.length > 50 
   ){
      return MESSAGE.ERROR_REQUIRED_FIELDS //400
   }else{
      // Encaminha os dados do novo  desenvolvedor para ser inserido no BD 
      let resultdesenvolvedor = await desenvolvedoresDAO.insertDesenvolvedor(desenvolvedores)

      if(resultdesenvolvedor)
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


 // Função para atualizar um novo desenvolvedor 
 const atualizarDesenvolvedor = async function(desenvolvedores,id,contentType){
   try {
      if(contentType == 'application/json'){

         if(
            desenvolvedores.nome            == undefined || desenvolvedores.nome            == ''    || desenvolvedores.nome            == null || desenvolvedores.nome.length > 80  ||
            desenvolvedores.email           == undefined || desenvolvedores.email           == ''    || desenvolvedores.email           == null || desenvolvedores.email.length > 50 ||
            desenvolvedores.cargo           == undefined || desenvolvedores.cargo           == ''    || desenvolvedores.cargo           == null || desenvolvedores.cargo.length > 50 ||
            id                            == undefined || id                              == ''    || id == null                              || isNaN(id)                         || id<=0

         ){
            return MESSAGE.ERROR_REQUIRED_FIELDS //400
         }else{
            //Validar se o ID existe no BD
            let resultdesenvolvedor = await buscarDesenvolvedor(parseInt(id))

            if(resultdesenvolvedor.status_code == 200){
               //Update
               //Adiciona um atributo ID no JSON para encaminhar ID da requisição
               desenvolvedores.id = parseInt(id)
               let result = await desenvolvedoresDAO.updateDesenvolvedor(desenvolvedores)

               if(result){
                  return MESSAGE.SUCESS_UPDATE_ITEM //200
               }else{
                  return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
               }

            }else if(resultdesenvolvedor.status_code == 404){
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

// Função para excluir um novo desenvolvedor
const excluiDesenvolvedor = async function(id){
   try {

      if(id == undefined || id ==  '' || isNaN(id)){
         return MESSAGE.ERROR_REQUIRED_FIELDS
      }

      if(id){
         let verificacao = await desenvolvedoresDAO.selectByIdDesenvolvedor(id)
         let resultdesenvolvedor = await desenvolvedoresDAO.deleteDesenvolvedor(id)

         if (verificacao!= false || typeof(verificacao) == 'object'){

            if(verificacao.length > 0){
               if(resultdesenvolvedor){
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

// Função para retornar todos os desenvolvedores
const listarDesenvoldedores = async function(){

   try {
      let dadosDesenvolvdor = {}

       //Chama a função para retornar os dados do jogo 
   let resultdesenvolvedor = await desenvolvedoresDAO.selectAllDesenvolvedor()

   if (resultdesenvolvedor != false || typeof(resultdesenvolvedor) == 'object'){

   if(resultdesenvolvedor.length > 0){
    dadosDesenvolvdor.status = true
    dadosDesenvolvdor.status_code = 200
    dadosDesenvolvdor.items = resultdesenvolvedor.length
    dadosDesenvolvdor.Desenvolvedores = resultdesenvolvedor

      return dadosDesenvolvdor //200
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

// Função para buscar um desenvolvedor
const buscarDesenvolvedor = async function(id){
   try {
      let dadosDesenvolvdor = {}

      if(id == undefined || id ==  '' || isNaN(id)){
         console.log(id)
         return MESSAGE.ERROR_REQUIRED_FIELDS
      }

      let resultdesenvolvedor = await desenvolvedoresDAO.selectByIdDesenvolvedor(id)

      if (resultdesenvolvedor != false || typeof(resultdesenvolvedor) == 'object'){

         if(resultdesenvolvedor.length > 0){
            dadosDesenvolvdor.status = true
            dadosDesenvolvdor.status_code = 200
            dadosDesenvolvdor.items = resultdesenvolvedor.length
            dadosDesenvolvdor.Desenvolvedores = resultdesenvolvedor
      
            return dadosDesenvolvdor //200
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
    inserirDesenvolvedores,
    atualizarDesenvolvedor,
    excluiDesenvolvedor,
    listarDesenvoldedores,
    buscarDesenvolvedor 

    }