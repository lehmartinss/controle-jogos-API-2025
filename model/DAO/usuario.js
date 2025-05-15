// Import da biblioteca do prisma client para executar scripts no BD 
const {PrismaClient} = require('@prisma/client')

     //Instancia da classe do prisma client, para gerar um objeto
     const prisma = new PrismaClient()

 // Função para inserir no Banco de Dados um novo usuario
    const insertUsuario = async function(usuario){
    try {
        
    let sql = `insert into tbl_usuario (
                                    idade,
                                    data_inscricao,
                                    nome
                                    ) values (
                                        '${usuario.idade}',
                                        '${usuario.data_inscricao}',
                                        '${usuario.nome}'
                                        )`

//Executa o script SQL no BD e AGUARDA o retorno do BD                          
    let result = await prisma.$executeRawUnsafe(sql)

    if(result)
        return true
    else
        return false

    } catch (error) {
        //console.log(error)
        return false
    }
}


 // Função para atualizar no Banco de Dados um novo usuario existente
 const updateUsuario = async function(usuario){
    try {
        let sql = ` update tbl_usuario set
                                        idade = '${usuario.idade}',
                                        data_inscricao = '${usuario.data_inscricao}',
                                        nome = '${usuario.nome}'
                                        
                                 where id_usuario = ${usuario.id}`

        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
        return false
    
    } catch (error) {
        return false
    }
}

// Função para excluir no Banco de Dados um novo usuario existente
const deleteUsuario = async function(id){
    try {
        let sql = `delete from tbl_usuario where id_usuario = ${id}`
        let result = await prisma.$executeRawUnsafe(sql)

            return result ? true : false

    } catch (error) {
        return false
    }
}

// Função para retornar no Banco de Dados uma lista de usuario
const selectAllUsuario = async function(){
    try {
        
        // Script SQL para retornar os dados do BD
        let sql = 'select * from tbl_usuario order by id_usuario desc'

        // Executa o scrpt SQL e aguarda o retorno dos dados
        let result = await prisma.$queryRawUnsafe(sql)

        if(result)
            return result
        else
            return false
    } catch (error) {
        return false
    }
}

// Função para buscar no Banco de Dados um usuario pelo ID
const selectByIdUsuario = async function(id){
    try {
        let sql = `select * from tbl_usuario where id_usuario = ${id}`
        let result = await prisma.$queryRawUnsafe(sql)

        if(result.length > 0)
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

module.exports = {
    insertUsuario,
    updateUsuario,
    deleteUsuario,
    selectAllUsuario,
    selectByIdUsuario
}
