const router=require('express').Router()
const connection=require('../db')

router.post('/create',(req,res)=>{
    const materia=Object.values(req.body)

    connection.query('INSERT INTO materia(codigoMateria,horariosMateria,añoMateria,IDpde) VALUES(?,?,?,?)',materia,(err,result)=>{
        if(err){
            console.log('Error al insertar registro en MySQL en tabla materias: ',err.message)
            res.status(500).send('Error al insertar',err)
        }else{
            res.status(200).send('Insercion exitosa en tabla materias')
        }
    })
})

router.get('/materias',(req,res)=>{
    
    connection.query('SELECT * FROM materia',(error,result)=>{
        if(error){
            console.log('Error al obtener los registros en MySQL en tabla materias: '+error.message)
            res.status(500).send('Error al obtener registros',error)
        }else{
            res.status(200).send(result)
        }
    })
})

router.get('/:id',(req,res)=>{
    const id=req.params.id

    connection.query(`SELECT * FROM materia WHERE IDmateria=${id}`,(error,result)=>{
        if(error){
            console.log("Error al obtener registro en MYSQL en tabla materias",error.message)
            res.status(500).send(error.message)
        }else{
            res.status(200).send(result)
        }
    })

})

router.delete('/delete/:id',(req,res)=>{
    const id=req.params.id

    connection.query(`DELETE FROM materia WHERE IDmateria=${id}`,(error,result)=>{
        if(error){
            console.log("Error al eliminar registro en MYSQL en tabla materias",error.message)
            res.status(500).send(error.message)
        }else{
            res.status(200).send(result)
        }
    })
})

router.put('/update/:id',(req,res)=>{
    const id=req.params.id
    const materia=Object.values(req.body)
    const keyvalues=Object.keys(req.body)
    var l=""
    
    for (let i = 0; i < keyvalues.length; i++) {
        l+=`${keyvalues[i]}=?`
        
        if(i<keyvalues.length-1) l+=","
    }

    connection.query(`UPDATE materia SET ${l} WHERE IDmateria=${id}`,materia,(error,result)=>{
        if(error){
            console.log("Error al updatear un registro en MYSQL en tabla materias ", error.message)
            res.status(500).send(error.message)
        }else{
            res.status(200).send(result)
        }
    })
})

module.exports=router