// Import do arquivo de configuração para message e status code 
const MESSAGE = require('../../modulo/config.js')

//Import do DAO para realizar o CRUD  no BD
const empresaDAO = require('../../model/DAO/empresa.js')


// Função para inserir uma nova empresa
 const inserirEmpresa = async function(empresa, contentType){
   try {
      if(contentType == 'application/json'){

   
   if(
    empresa.nome_empresa        == undefined || empresa.nome_empresa        == '' || empresa.nome_empresa    == null || empresa.nome_empresa.length > 45 ||
    empresa.email               == undefined || empresa.email               == '' || empresa.email           == null || empresa.email.length > 50 ||
    empresa.cnpj                == undefined || empresa.cnpj                == '' || empresa.cnpj            == null || 
    empresa.telefone            == undefined || empresa.telefone            == '' ||                                    empresa.telefone.length   > 45 
   ){
      return MESSAGE.ERROR_REQUIRED_FIELDS //400
   }else{
      // Encaminha os dados de uma nova empresa para ser inserido no BD 
      let resultEmpresa = await empresaDAO.insertEmpresa(empresa)

      if(resultEmpresa)
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

 // Função para atualizar uma nova emprsa
 const atualizarEmpresa = async function(empresa,id,contentType){
   try {
      if(contentType == 'application/json'){

         if(
            empresa.nome_empresa    == undefined || empresa.nome_empresa    == ''    || empresa.nome_empresa         == null || empresa.nome_empresa.length > 45 ||
            empresa.email           == undefined || empresa.email           == ''    || empresa.email                == null || empresa.email.length > 50 ||
            empresa.cnpj            == undefined || empresa.cnpj            == ''    || empresa.cnpj                 == null || 
            empresa.telefone        == undefined || empresa.telefone        == ''    ||                                         empresa.telefone.length     > 45    ||
            id                   == undefined || id                   == ''    || id == null                   || isNaN(id)                || id<=0

         ){
            return MESSAGE.ERROR_REQUIRED_FIELDS //400
         }else{
            //Validar se o ID existe no BD
            let resultEmpresa = await buscarEmpresa(parseInt(id))

            if(resultEmpresa.status_code == 200){
               //Update
               //Adiciona um atributo ID no JSON para encaminhar ID da requisição
               empresa.id = parseInt(id)
               let result = await empresaDAO.updateEmpresa(empresa)

               if(result){
                  return MESSAGE.SUCESS_UPDATE_ITEM //200
               }else{
                  return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
               }

            }else if(resultEmpresa.status_code == 404){
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

// Função para excluir uma nova empresa
const excluirEmpresa = async function(id){
   try {

      if(id == undefined || id ==  '' || isNaN(id)){
         return MESSAGE.ERROR_REQUIRED_FIELDS
      }

      if(id){
         let verificacao = await empresaDAO.selectByIdEmpresa(id)
         let resultEmpresa = await empresaDAO.deleteEmpresa(id)

         if (verificacao!= false || typeof(verificacao) == 'object'){

            if(verificacao.length > 0){
               if(resultEmpresa){
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

// Função para retornar todos as empresas
const listarEmpresa = async function(){

   try {
      let dadosEmpresa = {}

       //Chama a função para retornar os dados do jogo 
   let resultEmpresa = await empresaDAO.selectAllEmpresa()

   if (resultEmpresa != false || typeof(resultEmpresa) == 'object'){

   if(resultEmpresa.length > 0){
      dadosEmpresa.status = true
      dadosEmpresa.status_code = 200
      dadosEmpresa.items = resultEmpresa.length
      dadosEmpresa.Empresas = resultEmpresa

      return dadosEmpresa //200
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

// Função para buscar uma empresa
const buscarEmpresa = async function(id){
   try {
      let dadosEmpresa = {}

      if(id == undefined || id ==  '' || isNaN(id)){
         return MESSAGE.ERROR_REQUIRED_FIELDS
      }

      let resultEmpresa = await empresaDAO.selectByIdEmpresa(id)

      if (resultEmpresa != false || typeof(resultEmpresa) == 'object'){

         if(resultEmpresa.length > 0){
            dadosEmpresa.status = true
            dadosEmpresa.status_code = 200
            dadosEmpresa.items = resultEmpresa.length
            dadosEmpresa.Empresas = resultEmpresa
            
            return dadosEmpresa //200
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
    inserirEmpresa,
    atualizarEmpresa,
    excluirEmpresa,
    listarEmpresa,
    buscarEmpresa
    }