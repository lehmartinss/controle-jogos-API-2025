// Import da biblioteca do prisma client para executar scripts no BD 
const {PrismaClient} = require('@prisma/client')

     //Instancia da classe do prisma client, para gerar um objeto
     const prisma = new PrismaClient()

 // Função para inserir no Banco de Dados um novo desenvolvedor
const insertDesenvolvedor = async function(desenvolvedores){
    try {
        
    let sql = `insert into tbl_desenvolvedores (
                                    nome,
                                    email,
                                    cargo
                                    ) values (
                                        '${desenvolvedores.nome}',
                                        '${desenvolvedores.email}',
                                        '${desenvolvedores.cargo}'
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

// Função para atualizar no Banco de Dados um novo desenvolvedor 
 const updateDesenvolvedor = async function(desenvolvedores){
    try {
        let sql = ` update tbl_desenvolvedores set
                                        nome = '${desenvolvedores.nome}',
                                        email = '${desenvolvedores.email}',
                                        cargo = '${desenvolvedores.cargo}'
                                        
                                 where id = ${desenvolvedores.id}`

        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
        return false
    
    } catch (error) {
        return false
    }
}

// Função para excluir no Banco de Dados um novo desenvolvedor
const deleteDesenvolvedor = async function(id){
    try {
        let sql = `delete from tbl_desenvolvedores where id = ${id}`
        let result = await prisma.$executeRawUnsafe(sql)

            return result ? true : false

    } catch (error) {
        return false
    }
}

// Função para retornar no Banco de Dados uma lista de desenvolvedores
const selectAllDesenvolvedor = async function(){
    try {
        
        // Script SQL para retornar os dados do BD
        let sql = 'select * from tbl_desenvolvedores order by id desc'

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

// Função para buscar no Banco de Dados uma jogo pelo ID
const selectByIdDesenvolvedor = async function(id){
    try {
        let sql = `select * from tbl_desenvolvedores where id = ${id}`
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
    insertDesenvolvedor,
    updateDesenvolvedor,
    deleteDesenvolvedor,
    selectAllDesenvolvedor,
    selectByIdDesenvolvedor
}