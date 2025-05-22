// Import do arquivo de configuração para message e status code 
const MESSAGE = require('../../modulo/config.js')

//Import do DAO para realizar o CRUD  no BD
const usuarioDAO = require('../../model/DAO/usuario.js')
const controllerjogo = require('../jogo/controllerjogo.js')


 // Função para inserir um novo usuario
 const inserirUsuario = async function(usuario, contentType){
   try {
      if(contentType == 'application/json'){

   
   if(
    usuario.idade            == undefined || usuario.idade            == '' || usuario.idade            == null || 
    usuario.data_inscricao == undefined || usuario.data_inscricao == '' || usuario.data_inscricao == null || usuario.data_inscricao.length > 10 ||
    usuario.nome          == undefined || usuario.nome          == '' || usuario.nome          == null || usuario.nome.length > 100 ||
    usuario.id  == ''           || usuario.id  == undefined
      
   ){
      return MESSAGE.ERROR_REQUIRED_FIELDS //400
   }else{
      // Encaminha os dados do novo jogo para ser inserido no BD 
      let resultUsuario = await usuarioDAO.insertUsuario(usuario)

      if(resultUsuario)
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

 // Função para atualizar um novo usuario
 const atualizarUsuario = async function(usuario,id,contentType){
   try {
      if(contentType == 'application/json'){

         if(
            usuario.idade            == undefined || usuario.idade            == ''    || usuario.idade            == null ||
            usuario.data_inscricao == undefined || usuario.data_inscricao == ''    || usuario.data_inscricao == null || usuario.data_inscricao.length > 10 ||
            usuario.nome          == undefined || usuario.nome          == ''    || usuario.nome          == null || usuario.nome.length > 100 ||
            usuario.id  == ''           || usuario.id  == undefined 
         ){
            return MESSAGE.ERROR_REQUIRED_FIELDS //400
         }else{
            //Validar se o ID existe no BD
            let resultUsuario = await buscarUsuario(parseInt(id))

            if(resultUsuario.status_code == 200){
               //Update
               //Adiciona um atributo ID no JSON para encaminhar ID da requisição
               usuario.id = parseInt(id)
               let result = await usuarioDAO.updateUsuario(usuario)

               if(result){
                  return MESSAGE.SUCESS_UPDATE_ITEM //200
               }else{
                  return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
               }

            }else if(resultUsuario.status_code == 404){
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

// Função para excluir um novo usuario
const excluirUsuario = async function(id){
   try {

      if(id == undefined || id ==  '' || isNaN(id)){
         return MESSAGE.ERROR_REQUIRED_FIELDS
      }

      if(id){
         let verificacao = await usuarioDAO.selectByIdUsuario(id)
         let resultUsuario = await usuarioDAO.deleteUsuario(id)

         if (verificacao!= false || typeof(verificacao) == 'object'){

            if(verificacao.length > 0){
               if(resultUsuario){
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

// Função para retornar todos os usuarios
const listarUsuario= async function(){

   try {

       //Objeto do tipo array para utilizar no foreach para carregar os dados 
      //do usuario e do jogo
      const arrayUsuario = []

      let dadosUsuario = {}

       //Chama a função para retornar os dados do usuario
   let resultUsuario = await usuarioDAO.selectAllUsuario()

   if (resultUsuario != false || typeof(resultUsuario) == 'object'){

   if(resultUsuario.length > 0){
      //Criando um JSON de retorno de dados para a API
    dadosUsuario.status = true
    dadosUsuario.status_code = 200
    dadosUsuario.items = resultUsuario.length

       //resultUsuario.forEach(async function(itemUsuario){
      //foi necessário substituir o foreach pelo for of, pois
      //o foreach não consegue trabalhar com requisições async e await

      for(itemUsuario of resultUsuario){
         

/**** RETORNA OS DADOS DO JOGO PARA COLOCAR NO RETORNO DO USUARIO*****/
         //Busca os dados do jogo na controller de jogo
         //Utilizando o ID da jogo (Chave estrangeira)

         let dadosJogos = await controllerjogo.buscarJogo(itemUsuario.id)
        
          //Adicionando um atributo "jogo" no JSON de usuario
          itemUsuario.jogo = dadosJogos.games
        
          //Remove o atributo id do JSON de usuario, pois já temos
         //o ID dentro dos dados do jogo

         delete itemUsuario.id

         arrayUsuario.push(itemUsuario)
         
      }

    dadosUsuario.Usuario = arrayUsuario

      return dadosUsuario //200
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

// Função para buscar um usuario
const buscarUsuario = async function(id){
   try {

      let arrayUsuario = []

      if(id == undefined || id ==  '' || isNaN(id)){
         return MESSAGE.ERROR_REQUIRED_FIELDS
      }else{
         dadosUsuario = {}
      }

      let resultUsuario = await usuarioDAO.selectByIdUsuario(id)

      if (resultUsuario != false || typeof(resultUsuario) == 'object'){

         if(resultUsuario.length > 0){
            dadosUsuario.status = true
            dadosUsuario.status_code = 200
            dadosUsuario.items = resultUsuario.length

             for(itemUsuario of resultUsuario){

                let dadosJogos = await controllerjogo.buscarJogo(itemUsuario .id)

                itemUsuario.jogo = dadosJogos.games

                 delete itemUsuario.id

               arrayUsuario.push(itemUsuario)

             }

            dadosUsuario.Usuario = arrayUsuario
      
            return dadosUsuario //200
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
inserirUsuario,
atualizarUsuario,
excluirUsuario,
listarUsuario,
buscarUsuario
}