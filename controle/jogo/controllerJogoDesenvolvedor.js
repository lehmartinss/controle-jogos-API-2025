 
 /******************************************************************************************
 * Objetivo: Controller responsável pela regra de negócio referente ao CRUD de Filme Genero
 * Data: 11/02/2025
 * Autor: Marcel
 * Versão: 1.0
 ********************************************************************************************/

//Import do arquivo de configuração para message e status code 
const MESSAGE = require('../../modulo/config.js')

const JogoDesenvolvedorDAO = require('../../model/DAO/jogo_desenvolvedor.js')

const inserirJogoDesenvolvedor = async function(JogoDesenvolvedor, contentType){
   try {
      if(contentType == 'application/json'){

   
   if(
        JogoDesenvolvedor.id_filme              == ''           || JogoDesenvolvedor.id_filme     == undefined    || JogoDesenvolvedor.id_filme  == null || isNaN(JogoDesenvolvedor.id_filme)  || JogoDesenvolvedor.id_filme <=0 ||
        JogoDesenvolvedor.id_desenvolvedor            == ''           || JogoDesenvolvedor.id_desenvolvedor    == undefined    || JogoDesenvolvedor.id_desenvolvedor == null || isNaN(JogoDesenvolvedor.id_desenvolvedor) || JogoDesenvolvedor.id_desenvolvedor<=0
              
   ){
      return MESSAGE.ERROR_REQUIRED_FIELDS //400
   }else{
      // Encaminha os dados do novo jogo para ser inserido no BD 
      let resultJogoDesenvolvedor = await JogoDesenvolvedorDAO.insertJogoDesenvolvedor(JogoDesenvolvedor)

      if(resultJogoDesenvolvedor)
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


const atualizarJogoDesenvolvedor = async function(id, JogoDesenvolvedor, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json')
            {
                if (id                                      == ''           || id                                    == undefined    || id                    == null || isNaN(id)                    || id  <= 0   ||
                    JogoDesenvolvedor.id                    == ''           || JogoDesenvolvedor.id                  == undefined    || JogoDesenvolvedor.id  == null || isNaN(JogoDesenvolvedor.id)  || JogoDesenvolvedor.id<=0 ||
                    JogoDesenvolvedor.id_desenvolvedor      == ''           || JogoDesenvolvedor.id_desenvolvedor    == undefined    || JogoDesenvolvedor.id_desenvolvedor == null || isNaN(JogoDesenvolvedor.id_desenvolvedor) || JogoDesenvolvedor.id_desenvolvedor<=0
                )
                {
                    return MESSAGE.ERROR_REQUIRED_FIELDS //400
                }else{
                    //Validação para verificar se o ID existe no BD
                    let resultdesenvolvedor = await JogoDesenvolvedorDAO.selectAllJogoDesenvolvedor(parseInt(id))

                    if(resultdesenvolvedor != false || typeof(resultdesenvolvedor) == 'object'){
                        if(resultdesenvolvedor.length > 0 ){
                            //Update
                            //Adiciona o ID do genero no JSON com os dados
                            desenvolvedor.id_desenvolvedor = parseInt(id)

                            let result = await JogoDesenvolvedorDAO.updateJogoDesenvolvedor(JogoDesenvolvedor)

                            if(result){
                                return MESSAGE.SUCCESS_UPDATED_ITEM //200
                            }else{
                                return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                            }
                        }else{
                            return MESSAGE.ERROR_NOT_FOUND //404
                        }
                    }else{
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                    }
                }
            }else{
                return MESSAGE.ERROR_CONTENT_TYPE //415
            }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

const excluirJogoDesenvolvedor = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <=0){
            return MESSAGE.ERROR_REQUIRED_FIELDS //400
        }else{

            //Funcção que verifica se  ID existe no BD
            let resultdesenvolvedor = await JogoDesenvolvedorDAO.selectByIdJogoDesenvolvedor(parseInt(id))

            if(resultdesenvolvedor != false || typeof(resultdesenvolvedor) == 'object'){
                //Se existir, faremos o delete
                if(resultdesenvolvedor.length > 0){
                    //delete
                    let result = await JogoDesenvolvedorDAO.deleteJogoDesenvolvedor(parseInt(id))

                    if(result){
                        return MESSAGE.SUCESS_CREATED_ITEM//200
                    }else{
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                    }
                }else{
                    return MESSAGE.ERROR_NOT_FOUND //404
                }
            }else{
                return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Função para tratar o retorno de uma lista de generos do DAO
const listarJogoDesenvolvedor = async function(){
    try {
        //Objeto do tipo JSON
        let dadosDesenvolvdor = {}
        //Chama a função para retornar os generos cadastrados
        let resultdesenvolvedor = await JogoDesenvolvedorDAO.selectAllJogoDesenvolvedor()

        if(resultdesenvolvedor != false || typeof(resultdesenvolvedor) == 'object'){
            if(resultdesenvolvedor.length > 0){
                //Criando um JSON de retorno de dados para a API
                dadosDesenvolvdor.status = true
                dadosDesenvolvdor.status_code = 200
                dadosDesenvolvdor.items = resultdesenvolvedor.length
                dadosDesenvolvdor.Desenvolvedores = resultdesenvolvedor

                return dadosDesenvolvdor
            }else{
                return MESSAGE.ERROR_NOT_FOUND //404
            }
        }else{
            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

const buscarJogoDesenvolvedor = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <=0){
            return MESSAGE.ERROR_REQUIRED_FIELDS //400
        }else{
             dadosDesenvolvdor = {}

            let resultdesenvolvedor = await JogoDesenvolvedorDAO.selectByIdJogoDesenvolvedor(parseInt(id))
            
            if(resultdesenvolvedor != false || typeof(resultdesenvolvedor) == 'object'){
                if(resultdesenvolvedor.length > 0){
                     //Criando um JSON de retorno de dados para a API
                     dadosDesenvolvdor.status = true
                     dadosDesenvolvdor.status_code = 200
                     dadosDesenvolvdor.Desenvolvedores = resultdesenvolvedor

                    return  dadosDesenvolvdor //200
                }else{
                    return MESSAGE.ERROR_NOT_FOUND //404
                }
            }else{
                return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }

    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

const buscarDesenvolvedorPorJogo = async function(idJogo){
    try {
        if(idJogo == '' || idJogo == undefined || idJogo == null || isNaN(idJogo) || idJogo <=0){
            return MESSAGE.ERROR_REQUIRED_FIELDS //400
        }else{
            dadosDesenvolvdor = {}

            let resultdesenvolvedor = await JogoDesenvolvedorDAO.selectDesenvolvedorByIdJogo(parseInt(idJogo))
            
            if(resultdesenvolvedor != false || typeof(resultdesenvolvedor) == 'object'){
                if(resultdesenvolvedor.length > 0){
                     //Criando um JSON de retorno de dados para a API
                    dadosDesenvolvdor.status = true
                    dadosDesenvolvdor.status_code = 200
                    dadosDesenvolvdor.Desenvolvedores = resultdesenvolvedor

                    return dadosDesenvolvdor //200
                }else{
                    return MESSAGE.ERROR_NOT_FOUND //404
                }
            }else{
                return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }

    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}


module.exports = {
    inserirJogoDesenvolvedor,
    atualizarJogoDesenvolvedor,
    excluirJogoDesenvolvedor,
    listarJogoDesenvolvedor,
    buscarJogoDesenvolvedor,
    buscarDesenvolvedorPorJogo
} 

