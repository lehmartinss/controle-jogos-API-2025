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
 const controllerDesenvolvedores = require('./controle/desenvolvedores/controllerdesenvolvedores.js')
 const controllerEmpresa = require('./controle/empresa/controllerEmpresa.js')
 const controllerIdioma = require('./controle/idiomas/controllerIdioma.js')
 const controllerUsuario = require('./controle/usuario/controllerUsuario.js')



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

//Endpoint para retornar uma lista de jogos
app.get('/v1/controle-jogos/jogos', cors(), async function(request, response){
    //Chama a funcao para listar os jogos
    let resultJogo = await controllerJogo.listarJogo()

    response.status(resultJogo.status_code)
    response.json(resultJogo)
})

// EndPoint para retornar o jogo de acordo com o ID
app.get('/v1/controle-jogos/jogo/:id', cors(), async function (request, response) {

    // Recebe content type para validar o tipo de dados da requisição
    let contentType = request.headers['content-type']

    //Recebe o conteudo do body da requisição
    let id = request.params.id

    // Chama a função para listar os jogos
    let resultJogo = await controllerJogo.buscarJogo(id)

    response.status(resultJogo.status_code)
    response.json(resultJogo)
})

//EndPoint para apagar um jogo de acordo com o ID
app.delete('/v1/controle-jogos/jogo/deletarjogo/:id',cors(), async function (request, response){
    let id = request.params.id
    let resultJogo = await controllerJogo.excluirJogo(id)

    response.status(resultJogo.status_code)
    response.json(resultJogo)
})
    
app.put('/v1/controle-jogos/jogo/:id',cors(), bodyParserJSON, async function (request, response) {

    //Recebe o content-type da requisição
    let contentType = request.headers['content-type']
    //recebe o ID do jogo
    let idJogo = request.params.id
    //Recebe os dados do jogo encaminhado no body da requisição
    let dadosBody = request.body

    let resultJogo = await controllerJogo.atualizarJogo(dadosBody,idJogo,contentType)

    response.status(resultJogo.status_code)
    response.json(resultJogo)
})



////////////////////////////////////////////DESENVOLVEDOR///////////////////////////////////////////////////////////////////////

//EndPoint para inserir um desenvolvedor no BD
app.post('/v1/controle-desenvolvedores/desenvolvedor', cors(), bodyParserJSON, async function (request, response){

    // Recebe content type para validar o tipo de dados da requisição
    let contentType = request.headers['content-type']

    //Recebe o conteudo do body da requisição
    let dadosBody = request.body 

    // Encaminhando os dados do body da requisição para a controller inserir no BD 
    let resultdesenvolvedor = await controllerDesenvolvedores.inserirDesenvolvedores(dadosBody, contentType)

    response.status(resultdesenvolvedor.status_code)

    response.json(resultdesenvolvedor)
}) 

//Endpoint para retornar uma lista de desenvolvedores
app.get('/v1/controle-desenvolvedores/desenvolvedor', cors(), async function(request, response){
    //Chama a funcao para listar os  desenvolvedores
    let resultdesenvolvedor = await controllerDesenvolvedores.listarDesenvoldedores()

    response.status(resultdesenvolvedor.status_code)
    response.json(resultdesenvolvedor)
})

// EndPoint para retornar o desenvolvedor de acordo com o ID
app.get('/v1/controle-desenvolvedores/desenvolvedor/:id', cors(), async function (request, response) {

    // Recebe content type para validar o tipo de dados da requisição
    let contentType = request.headers['content-type']

    //Recebe o conteudo do body da requisição
    let id = request.params.id

    // Chama a função para listar os jogos
    let resultdesenvolvedor = await controllerDesenvolvedores.buscarDesenvolvedor(id)

    response.status(resultdesenvolvedor.status_code)
    response.json(resultdesenvolvedor)
})

//EndPoint para apagar um desenvolvedor de acordo com o ID
app.delete('/v1/controle-desenvolvedores/desenvolvedor/:id',cors(), async function (request, response){
    let id = request.params.id
    let resultdesenvolvedor = await controllerDesenvolvedores.excluiDesenvolvedor(id)

    response.status(resultdesenvolvedor.status_code)
    response.json(resultdesenvolvedor)
})

// EndPoint para atualizar as informacoes de um desenvolvedor de acordo com o ID
app.put('/v1/controle-desenvolvedores/desenvolvedor/:id',cors(), bodyParserJSON, async function (request, response) {

    //Recebe o content-type da requisição
    let contentType = request.headers['content-type']
    //recebe o ID do desenvolvedor
    let idDesenvolvedor = request.params.id
    //Recebe os dados do desenvolvedor encaminhado no body da requisição
    let dadosBody = request.body

    let resultdesenvolvedor = await controllerDesenvolvedores.atualizarDesenvolvedor(dadosBody,idDesenvolvedor,contentType)

    response.status(resultdesenvolvedor.status_code)
    response.json(resultdesenvolvedor)
})


//////////////////////////////////////////////////////EMPRESA////////////////////////////////////////////////////////////////////////////////////

//EndPoint para inserir uma empresa no BD
app.post('/v1/controle-empresa/empresa', cors(), bodyParserJSON, async function (request, response){

    // Recebe content type para validar o tipo de dados da requisição
    let contentType = request.headers['content-type']

    //Recebe o conteudo do body da requisição
    let dadosBody = request.body 

    // Encaminhando os dados do body da requisição para a controller inserir no BD 
    let resultEmpresa = await controllerEmpresa.inserirEmpresa(dadosBody, contentType)

    response.status(resultEmpresa.status_code)

    response.json(resultEmpresa)
}) 

//Endpoint para retornar uma lista de empresas
app.get('/v1/controle-empresa/empresa', cors(), async function(request, response){
    //Chama a funcao para listar as empresas
    let resultEmpresa = await controllerEmpresa.listarEmpresa()

    response.status(resultEmpresa.status_code)
    response.json(resultEmpresa)
})

// EndPoint para retornar a empresa de acordo com o ID
app.get('/v1/controle-empresa/empresa/:id', cors(), async function (request, response) {

    // Recebe content type para validar o tipo de dados da requisição
    let contentType = request.headers['content-type']

    //Recebe o conteudo do body da requisição
    let id = request.params.id

    // Chama a função para listar as empresas
    let resultEmpresa = await controllerEmpresa.buscarEmpresa(id)

    response.status(resultEmpresa.status_code)
    response.json(resultEmpresa)
})

//EndPoint para apagar uma empresa de acordo com o ID
app.delete('/v1/controle-empresa/empresa/:id',cors(), async function (request, response){
    let id = request.params.id
    let resultEmpresa = await controllerEmpresa.excluirEmpresa(id)

    response.status(resultEmpresa.status_code)
    response.json(resultEmpresa)
})

// EndPoint para atualizar as informacoes de uma empresa de acordo com o ID
app.put('/v1/controle-empresa/empresa/:id',cors(), bodyParserJSON, async function (request, response) {

    //Recebe o content-type da requisição
    let contentType = request.headers['content-type']
    //recebe o ID da empresa
    let idEmpresa = request.params.id
    //Recebe os dados da empresa encaminhado no body da requisição
    let dadosBody = request.body

    let resultEmpresa = await controllerEmpresa.atualizarEmpresa(dadosBody,idEmpresa,contentType)

    response.status(resultEmpresa.status_code)
    response.json(resultEmpresa)
})

///////////////////////////////////////////////IDIOMA///////////////////////////////////////////////////////////////////////////////////////////////////////

//EndPoint para inserir um idioma no BD
app.post('/v1/controle-idioma/idioma', cors(), bodyParserJSON, async function (request, response){

    // Recebe content type para validar o tipo de dados da requisição
    let contentType = request.headers['content-type']

    //Recebe o conteudo do body da requisição
    let dadosBody = request.body 

    // Encaminhando os dados do body da requisição para a controller inserir no BD 
    let resultIdioma = await controllerIdioma.inserirIdioma(dadosBody, contentType)

    response.status(resultIdioma.status_code)

    response.json(resultIdioma)
}) 

//Endpoint para retornar uma lista de idiomas
app.get('/v1/controle-idioma/idioma', cors(), async function(request, response){
    //Chama a funcao para listar os idiomas
    let resultIdioma = await controllerIdioma.listarIdioma()

    response.status(resultIdioma.status_code)
    response.json(resultIdioma)
})

// EndPoint para retornar o idioma de acordo com o ID
app.get('/v1/controle-idioma/idioma/:id', cors(), async function (request, response) {

    // Recebe content type para validar o tipo de dados da requisição
    let contentType = request.headers['content-type']

    //Recebe o conteudo do body da requisição
    let id = request.params.id

    // Chama a função para listar os idiomas
    let resultIdioma = await controllerIdioma.buscarIdioma(id)

    response.status(resultIdioma.status_code)
    response.json(resultIdioma)
})

//EndPoint para apagar um idioma de acordo com o ID
app.delete('/v1/controle-idioma/idioma/:id',cors(), async function (request, response){
    let id = request.params.id
    let resultIdioma = await controllerIdioma.excluirIdioma(id)

    response.status(resultIdioma.status_code)
    response.json(resultIdioma)
})

// EndPoint para atualizar as informacoes de um idioma  de acordo com o ID
app.put('/v1/controle-idioma/idioma/:id',cors(), bodyParserJSON, async function (request, response) {

    //Recebe o content-type da requisição
    let contentType = request.headers['content-type']
    //recebe o ID do idioma
    let idIdioma = request.params.id
    //Recebe os dados do idioma encaminhado no body da requisição
    let dadosBody = request.body

    let resultIdioma = await controllerIdioma.atualizarIdioma(dadosBody,idIdioma,contentType)

    response.status(resultIdioma.status_code)
    response.json(resultIdioma)
})



/////////////////////////////////////////////////// USUARIO ///////////////////////////////////////////////////////////////////////////////////////////////////////////

//EndPoint para inserir um usuario no BD
app.post('/v1/controle-usuario/usuario', cors(), bodyParserJSON, async function (request, response){

    // Recebe content type para validar o tipo de dados da requisição
    let contentType = request.headers['content-type']

    //Recebe o conteudo do body da requisição
    let dadosBody = request.body 

    // Encaminhando os dados do body da requisição para a controller inserir no BD 
    let resultUsuario = await controllerUsuario.inserirUsuario(dadosBody, contentType)

    response.status(resultUsuario.status_code)

    response.json(resultUsuario)
}) 

//Endpoint para retornar uma lista de usuarios
app.get('/v1/controle-usuario/usuario', cors(), async function(request, response){
    //Chama a funcao para listar os usuarios
    let resultUsuario = await controllerUsuario.listarUsuario()

    response.status(resultUsuario.status_code)
    response.json(resultUsuario)
})

// EndPoint para retornar o usuario de acordo com o ID
app.get('/v1/controle-usuario/usuario/:id', cors(), async function (request, response) {

    // Recebe content type para validar o tipo de dados da requisição
    let contentType = request.headers['content-type']

    //Recebe o conteudo do body da requisição
    let id = request.params.id

    // Chama a função para listar os idiomas
    let resultUsuario = await controllerUsuario.buscarUsuario(id)

    response.status(resultUsuario.status_code)
    response.json(resultUsuario)
})

//EndPoint para apagar um usuario de acordo com o ID
app.delete('/v1/controle-usuario/usuario/:id',cors(), async function (request, response){
    let id = request.params.id
    let resultUsuario = await controllerUsuario.excluirUsuario(id)

    response.status(resultUsuario.status_code)
    response.json(resultUsuario)
})

// EndPoint para atualizar as informacoes de um usuario  de acordo com o ID
app.put('/v1/controle-usuario/usuario/:id',cors(), bodyParserJSON, async function (request, response) {

    //Recebe o content-type da requisição
    let contentType = request.headers['content-type']
    //recebe o ID do usuario
    let idUsuario = request.params.id
    //Recebe os dados do usuario encaminhado no body da requisição
    let dadosBody = request.body

    let resultUsuario = await controllerUsuario.atualizarUsuario(dadosBody,idUsuario,contentType)

    response.status(resultUsuario.status_code)
    response.json(resultUsuario)
})



app.listen(8080, function(){
    console.log('API aguardando Requisições...')
})