//import da biblioteca do prisma client para executar os scripts SQL
const { PrismaClient } = require('@prisma/client')

//Instancia (criar um objeto a ser utilizado) a biblioteca do prisma/client
const prisma = new PrismaClient()

const insertJogoDesenvolvedor = async function(JogoDesenvolvedor){
  try {

      let sql = `insert into tbl_jogo_desenvolvedor  ( 
                                          id,
                                          id_desenvolvedor
                                        ) 
                                          values 
                                        (
                                          ${JogoDesenvolvedor.id},
                                          ${JogoDesenvolvedor.id_desenvolvedor}
                                        )`

      //Executa o scriptSQL no banco de dados e aguarda o retorno do BD para 
      //saber se deu certo                                  
      let result = await prisma.$executeRawUnsafe(sql)

      if(result)
          return true
      else
          return false
  } catch (error) {
      
      return false
  }
}


const updateJogoDesenvolvedor = async function(JogoDesenvolvedor){
  try {
      let sql = `update tbl_jogo_desenvolvedor set      
                                                    id       = ${JogoDesenvolvedor.id},
                                                    id_desenvolvedor    = ${JogoDesenvolvedor.id_desenvolvedor}
                                        
                            where id_jogo_desenvolvedor = ${JogoDesenvolvedor.id}                
                            `
      let resultJogoDesenvolvedor = await prisma.$executeRawUnsafe(sql)

      if(resultJogoDesenvolvedor)
        return true
      else
        return false
  } catch (error) {
    return false
  }
}


const deleteJogoDesenvolvedor = async function(id){
  try {
    let sql = `delete from tbl_jogo_desenvolvedor where id_jogo_desenvolvedor = ${id}`

    let result = await prisma.$executeRawUnsafe(sql)

    if (result)
      return true
    else 
      return false
  } catch (error) {
    return false
  }
}


const selectAllJogoDesenvolvedor = async function(){

    try {
      //ScriptSQL para retornar todos os dados
      let sql = 'select * from tbl_jogo_dsenvolvedor order by id_jogo_desenvolvedor desc'

      //Executa o scriptSQL no BD e aguarda o retorno dos dados
      let result = await prisma.$queryRawUnsafe(sql)

      if(result)
        return result
      else
        return false

    } catch (error) {
      return false
    }
}

const selectByIdJogoDesenvolvedor = async function(id){
  try {
    let sql = `select * from tbl_jogo_desenvolvedor where id_jogo_desenvolvedor = ${id}`

    let result = await prisma.$queryRawUnsafe(sql)

    if (result)
      return result
    else 
      return false
  } catch (error) {
    return false
  }
}

const selectDesenvolvedorByIdJogo = async function(idJogo){
  try {
      let sql = `select * from tbl_jogo_desenvolvedor where id = ${idJogo}`

      let result = await prisma.$queryRawUnsafe(sql)

      if (result)
        return result
      else 
        return false
  } catch (error) {
    console.log(error);
    
      return false
  }
}

const selectJogoByIdDesenvolvedor = async function(idDesenvolvedor){
  try {
      let sql = `select * from tbl_jogo_desenvolvedor where id_desenvolvedor = ${idDesenvolvedor}`

      let result = await prisma.$queryRawUnsafe(sql)

      if (result)
        return result
      else 
        return false
  } catch (error) {
    
      return false
  }
}




module.exports = {
    insertJogoDesenvolvedor,
    updateJogoDesenvolvedor,
    deleteJogoDesenvolvedor,
    selectAllJogoDesenvolvedor,
    selectByIdJogoDesenvolvedor,
    selectJogoByIdDesenvolvedor,
    selectDesenvolvedorByIdJogo
} 



