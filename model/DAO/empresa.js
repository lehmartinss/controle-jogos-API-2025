
 // Import da biblioteca do prisma client para executar scripts no BD 
const {PrismaClient} = require('@prisma/client')

     //Instancia da classe do prisma client, para gerar um objeto
     const prisma = new PrismaClient()

 // Função para inserir no Banco de Dados uma nova empresa
    const insertEmpresa = async function(empresa){
    try {
        console.log(empresa)
        
    let sql = `insert into tbl_empresa (
                                    nome_empresa,
                                    email,
                                    cnpj,
                                    telefone,
                                    id
                                    ) values (
                                        '${empresa.nome_empresa}',
                                        '${empresa.email}',
                                        '${empresa.cnpj}',
                                        '${empresa.telefone}',
                                        '${empresa.id}'
                                        )`

//Executa o script SQL no BD e AGUARDA o retorno do BD                          
    let result = await prisma.$executeRawUnsafe(sql)

    if(result)
        return true
    else
        return false

    } catch (error) {
        return false
    }
}

 // Função para atualizar no Banco de Dados uma nova empresa existente
 const updateEmpresa = async function(empresa){
    try {
        let sql = ` update tbl_empresa set
                                        nome_empresa = '${empresa.nome_empresa}',
                                        email = '${empresa.email}',
                                        cnpj = '${empresa.cnpj}',
                                        telefone = '${empresa.telefone}',
                                        id = '${empresa.id}'
                                 where id_empresa = ${empresa.id_empresa}`

        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
        return false
    
    } catch (error) {
        return false
    }
}

// Função para excluir no Banco de Dados uma nova empresa existente
const deleteEmpresa = async function(id){
    try {
        let sql = `delete from tbl_empresa where id_empresa = ${id}`
        let result = await prisma.$executeRawUnsafe(sql)

            return result ? true : false

    } catch (error) {
        return false
    }
}

// Função para retornar no Banco de Dados uma lista de empresas
const selectAllEmpresa = async function(){
    try {
        
        // Script SQL para retornar os dados do BD
        let sql = 'select * from tbl_empresa order by id_empresa desc'

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

// Função para buscar no Banco de Dados uma empresa pelo ID
const selectByIdEmpresa = async function(id){
    try {
        let sql = `select * from tbl_empresa where id_empresa = ${id}`
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
    insertEmpresa,
    updateEmpresa,
    deleteEmpresa,
    selectAllEmpresa,
    selectByIdEmpresa
}