/***********************************************************************************************************
 * Objetivo: API referente ao projeto de controle de jogos
 * Data: 13/02/2025
 * Autor: Marcel
 * Versão: 1.0
 * Observação: 
 ************ Para configurar e instalar  API, precisamos das seguintes bibliotecas;
 *              express              npm install express --save
 *              cors                 npm install cors --save
 *              body-parser          npm install body-parser --save
 ************ Para configurar e instalar o acesso ao Banco de Dados precisamos:
 *              prisma               npm install prisma --save (conexão com o BD)
 *              prisma/client        npm install @prisma/client --save (executa scripts no BD)
 * 
 ************ Após a instalção do prisma e do prisma client, devemos:
 *              npx prisma init   (Inicializar o prisma no projeto)
 * 
 ************ Para realizar o sincronismo do prisma com o BD, devemos executar o seguinte comando:
 *              npx prisma migrate dev
 ***************************************************************************************************************/

 const express    = require('express')
 const cors       = require('cors')
 const bodyParser = require('body-parser')

// Import das controlles para realizar o CRUD 
 const controllerJogo = require('./controle/jogo/controllerjogo.js')

 // Estabelecendo o formado de dados que deverá chegar no body da requisição (POST ou PUT)
 const bodyParserJSON = bodyParser.json()

 // Cria o objeto app para criar API
 const app = express()

 app.use((request, response, next) =>{
    response.header('Access-Control-Allow-origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

    app.use(cors())
    next()

})

//EndPoint para inserir um jogo no BD
app.post('/v1/controle-jogos/jogo', cors(), bodyParserJSON, async function (request, response){

    // Recebe content type para validar o tipo de dados da requisição
    let contentType = request.headers['content-type']

    //Recebe o conteudo do body da requisição
    let dadosBody = request.body 

    // Encaminhando os dados do body da requisição para a controller inserir no BD 
    let resultJogo = await controllerJogo.inserirJogo(dadosBody, contentType)

    response.status(resultJogo.status_code)

    response.json(resultJogo)
}) 

app.get('/v1/controle-jogos/jogo/1', cors(), async function (request, response) {
    // Chama a função para listar os jogos
    let resultJogo = await controllerJogo.listarJogo()

    response.status(resultJogo.status_code)
    response.json(resultJogo)
})

app.get('/v1/controle-jogos/jogos', cors(), async function(request, response){

})
app.listen(8080, function(){
    console.log('API aguardando Requisições...')
})
    
