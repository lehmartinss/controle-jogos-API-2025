//import da biblioteca do prisma client para executar os scripts SQL
const { PrismaClient } = require('@prisma/client')

//Instancia (criar um objeto a ser utilizado) a biblioteca do prisma/client
const prisma = new PrismaClient()

const insertJogoIdioma = async function(JogoIdioma){
  try {

      let sql = `insert into tbl_jogo_idioma  ( 
                                          id,
                                          id_idioma
                                        ) 
                                          values 
                                        (
                                          ${JogoIdioma.id},
                                          ${JogoIdioma.id_idioma}
                                        )`
                               
      let result = await prisma.$executeRawUnsafe(sql)

      if(result)
          return true
      else
          return false
  } catch (error) {
      
      return false
  }
}

const updateJogoIdioma = async function(JogoIdioma){
  try {
      let sql = `update tbl_jogo_idioma set      
                                                    id       = ${JogoIdioma.id},
                                                    id_idioma    = ${JogoIdioma.id_idioma}
                                        
                            where id_jogo_idioma = ${JogoIdioma.id}                
                            `
      let resultJogoIdioma = await prisma.$executeRawUnsafe(sql)

      if(resultJogoIdioma)
        return true
      else
        return false
  } catch (error) {
    return false
  }
}

const deleteJogoIdioma = async function(id){
  try {
    let sql = `delete from tbl_jogo_idioma where id_jogo_idioma = ${id}`

    let result = await prisma.$executeRawUnsafe(sql)

    if (result)
      return true
    else 
      return false
  } catch (error) {
    return false
  }
}

const selectAllJogoIdioma = async function(){

    try {
      let sql = 'select * from tbl_jogo_idioma order by id_jogo_idioma desc'

      let result = await prisma.$queryRawUnsafe(sql)

      if(result)
        return result
      else
        return false

    } catch (error) {
      return false
    }
}

const selectByIdJogoIdioma = async function(id){
  try {
    let sql = `select * from tbl_jogo_idioma where id_jogo_idioma = ${id}`

    let result = await prisma.$queryRawUnsafe(sql)

    if (result)
      return result
    else 
      return false
  } catch (error) {
    return false
  }
}

const selectIdiomaByIdJogo = async function(idJogo){
  try {
      let sql = `select * from tbl_jogo_idioma where id = ${idJogo}`

      let result = await prisma.$queryRawUnsafe(sql)

      if (result)
        return result
      else 
        return false
  } catch (error) {
      return false
  }
}

const selectJogoByIdIdioma = async function(idIdioma){
  try {
      let sql = `select * from tbl_jogo_idioma where id_idioma = ${idIdioma}`

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
    insertJogoIdioma,
    updateJogoIdioma,
    deleteJogoIdioma,
    selectAllJogoIdioma,
    selectByIdJogoIdioma,
    selectJogoByIdIdioma,
    selectIdiomaByIdJogo
}