const connection = require("../db")
const router  = require("express").Router()

router.post('/create-curso',(req,res)=>{
    const curso=Object.values(req.body)

    connection.query(`INSERT INTO Cursos(nombreCurso,cicloLectivo,IDpde) VALUES(?,?,?)`,curso,(err,result)=>{
        if(err) res.status(500).send('Error al insertar registro en tabla Cursos',err.message)
        else res.status(200).send(result)
    })
})


router.get('/cursos',(req,res)=>{
    
    connection.query('SELECT * FROM cursos',(error,result)=>{
        if(error){
            console.log('Error al obtener los registros en MySQL en tabla cursos: '+error.message)
            res.status(500).send('Error al obtener registros',err)
        }else{
            res.status(200).send(result)
        }
    })
})

router.get('/:id',(req,res)=>{
    const id=req.params.id

    connection.query(`SELECT * FROM cursos WHERE IDcurso=${id}`,(error,result)=>{
        if(error){
            console.log("Error al obtener registro en MYSQL en tabla cursos",error.message)
            res.status(500).send(error.message)
        }else{
            res.status(200).send(result)
        }
    })

})

router.delete('/delete-curso/:id',(req,res)=>{
    const id=req.params.id

    connection.query(`DELETE FROM cursos WHERE IDcurso=${id}`,(error,result)=>{
        if(error){
            console.log("Error al eliminar registro en MYSQL en tabla cursos",error.message)
            res.status(500).send(error.message)
        }else{
            res.status(200).send(result)
        }
    })
})

router.put('/update-curso/:id',(req,res)=>{
    const id=req.params.id
    const curso=Object.values(req.body)
    const keyvalues=Object.keys(req.body)
    var l=""
    
    for (let i = 0; i < keyvalues.length; i++) {
        l+=`${keyvalues[i]}=?`
        
        if(i<keyvalues.length-1) l+=","
    }

    connection.query(`UPDATE cursos SET ${l} WHERE IDcurso=${id}`,curso,(error,result)=>{
        if(error){
            console.log("Error al updatear un registro en MYSQL en tabla cursos ", error.message)
            res.status(500).send(error.message)
        }else{
            res.status(200).send(result)
        }
    })
})

module.exports=router