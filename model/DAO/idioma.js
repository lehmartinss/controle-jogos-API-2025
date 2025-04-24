// Import da biblioteca do prisma client para executar scripts no BD 
const {PrismaClient} = require('@prisma/client')

//Instancia da classe do prisma client, para gerar um objeto
const prisma = new PrismaClient()

 // Função para inserir no Banco de Dados um novo jogo
    const insertIdioma = async function(idioma){
    try {
        
    let sql = `insert into tbl_idioma (
                                    idioma
                                    ) values (
                                        '${idioma.idioma}'
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

// Função para atualizar no Banco de Dados um novo idioma existente
 const updateIdioma = async function(idioma){
    try {
        let sql = ` update tbl_idioma set
                                        idioma = '${idioma.idioma}'
                                    
                                 where id = ${idioma.id}`

        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
        return false
    
    } catch (error) {
        return false
    }
}

// Função para excluir no Banco de Dados um novo idioma existente
const deleteIdioma = async function(id){
    try {
        let sql = `delete from tbl_idioma where id = ${id}`
        let result = await prisma.$executeRawUnsafe(sql)

            return result ? true : false

    } catch (error) {
        return false
    }
}

// Função para retornar no Banco de Dados uma lista de idiomas
const selectAllIdioma = async function(){
    try {
        
        // Script SQL para retornar os dados do BD
        let sql = 'select * from tbl_idioma order by id desc'

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

// Função para buscar no Banco de Dados um idioma pelo ID
const selectByIdIdioma = async function(id){
    try {
        let sql = `select * from tbl_idioma where id = ${id}`
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
    insertIdioma,
    updateIdioma,
    deleteIdioma,
    selectAllIdioma,
    selectByIdIdioma
}

