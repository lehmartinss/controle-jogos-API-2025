//Import do arquivo de configuração para message e status code 
const MESSAGE = require('../../modulo/config.js')

const JogoIdiomaDAO = require('../../model/DAO/jogo_idioma.js')
const controlleridioma = require('../idiomas/controllerIdioma.js')

const inserirJogoidioma = async function(JogoIdioma, contentType){
   try {
      if(contentType == 'application/json'){

   
   if(
        JogoIdioma.id            == ''           || JogoIdioma.id    == undefined    || JogoIdioma.id == null || isNaN(JogoIdioma.id)  || JogoIdioma.id <=0 ||
        JogoIdioma.id_idioma            == ''           || JogoIdioma.id_idioma   == undefined    || JogoIdioma.id_idioma == null || isNaN(JogoIdioma.id_idioma) || JogoIdioma.id_idioma<=0
              
   ){
      return MESSAGE.ERROR_REQUIRED_FIELDS //400
   }else{
      // Encaminha os dados do novo jogo para ser inserido no BD 
      let resultJogoIdioma= await JogoIdiomaDAO.insertJogoIdioma(JogoIdioma)

      if(resultJogoIdioma)
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

const atualizarJogoidioma = async function(id, JogoIdioma, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json')
            {
                if (id                                      == ''           || id                                    == undefined    || id                    == null || isNaN(id)                    || id  <= 0   ||
                    JogoIdioma.id                    == ''           || JogoIdioma.id                  == undefined    || JogoIdioma.id  == null || isNaN(JogoIdioma.id)  || JogoIdioma.id<=0 ||
                    JogoIdioma.id_idioma     == ''           || JogoIdioma.id_idioma    == undefined    || JogoIdioma.id_idioma == null || isNaN(JogoIdioma.id_idioma) || JogoIdioma.id_idioma<=0
                )
                {
                    return MESSAGE.ERROR_REQUIRED_FIELDS //400
                }else{
                    //Validação para verificar se o ID existe no BD
                    let resultIdioma = await JogoIdiomaDAO.selectAllJogoIdioma(parseInt(id))

                    if(resultIdioma != false || typeof(resultIdioma) == 'object'){
                        if(resultIdioma.length > 0 ){
                            //Update
                            //Adiciona o ID do genero no JSON com os dados
                            JogoIdioma.id_idioma = parseInt(id)

                            let result = await JogoIdiomaDAO.updateJogoIdioma (JogoIdioma)

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

const excluirJogoIdioma = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <=0){
            return MESSAGE.ERROR_REQUIRED_FIELDS //400
        }else{

            //Funcção que verifica se  ID existe no BD
            let resultIdioma = await JogoIdiomaDAO.selectByIdJogoIdioma(parseInt(id))

            if(resultIdioma != false || typeof(resultIdioma) == 'object'){
                //Se existir, faremos o delete
                if(resultIdioma.length > 0){
                    //delete
                    let result = await JogoIdiomaDAO.deleteJogoIdioma(parseInt(id))

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
const listarJogoIdioma = async function(){
    try {
        //Objeto do tipo JSON
        let dadosIdiomas = {}
        //Chama a função para retornar os generos cadastrados
        let resultIdioma = await JogoIdiomaDAO.selectAllJogoIdioma()

        if(resultIdioma != false || typeof(resultIdioma) == 'object'){
            if(resultIdioma.length > 0){
                //Criando um JSON de retorno de dados para a API
                dadosIdiomas.status = true
                dadosIdiomas.status_code = 200
                dadosIdiomas.items = resultIdioma.length
                dadosIdiomas.Idiomas = resultIdioma

                return dadosIdiomas
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

const buscarJogoIdioma = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <=0){
            return MESSAGE.ERROR_REQUIRED_FIELDS //400
        }else{
             dadosIdiomas = {}

            let resultIdioma = await JogoIdiomaDAO.selectByIdJogoIdioma(parseInt(id))
            
            if(resultIdioma != false || typeof(resultIdioma) == 'object'){
                if(resultIdioma.length > 0){
                     //Criando um JSON de retorno de dados para a API
                     dadosIdiomas.status = true
                     dadosIdiomas.status_code = 200
                     dadosIdiomas.Idiomas = resultIdioma

                    return  dadosIdiomas //200
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

const buscarIdiomaPorJogo = async function(idJogo){
    try {

        let arrayIdioma = []
        if(idJogo == '' || idJogo == undefined || idJogo == null || isNaN(idJogo) || idJogo <=0){
            return MESSAGE.ERROR_REQUIRED_FIELDS //400
        }else{
            dadosIdiomas = {}

            let resultIdioma = await JogoIdiomaDAO.selectIdiomaByIdJogo(parseInt(idJogo))
            
            if(resultIdioma != false || typeof(resultIdioma) == 'object'){
                if(resultIdioma.length > 0){
                     //Criando um JSON de retorno de dados para a API
                    dadosIdiomas.status = true
                    dadosIdiomas.status_code = 200

                      for(item of resultIdioma ){
                                            
                        let dadosIdiomas = await controlleridioma.buscarIdioma(item.id_idioma)
                                    
                        item.Idiomas = dadosIdiomas.Idiomas
                              
                        delete item.id_jogo_idioma
                        delete item.id_idioma
                        delete item.id
                      
                                           
                        arrayIdioma.push(item)
                    }

                    dadosIdiomas.Idiomas =  arrayIdioma

                    return dadosIdiomas //200
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
    inserirJogoidioma,
    atualizarJogoidioma,
    excluirJogoIdioma,
    listarJogoIdioma,
    buscarJogoIdioma,
    buscarIdiomaPorJogo
} 