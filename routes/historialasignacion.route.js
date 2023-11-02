const router=require('express').Router()
const connection=require('../db')

router.post('/create',(req,res)=>{
    const historialasig=Object.values(req.body)

    connection.query('INSERT INTO historialasignacion(fechaInicio,fechaCese,IDdocente,IDcargoVac) VALUES(?,?,?,?)',historialasig,(err,result)=>{
        if(err){
            console.log('Error al insertar registro en MySQL en tabla historialasignacion: '+err.message)
            res.status(500).send('Error al insertar',err)
        }else{
            res.status(200).send('Insercion exitosa en tabla historialasignacion')
        }
    })
})

router.get('/historialasignacion',(req,res)=>{
    
    connection.query('SELECT * FROM historialasignacion',(error,result)=>{
        if(error){
            console.log('Error al obtener los registros en MySQL en tabla historialasignacion: '+error.message)
            res.status(500).send('Error al obtener registros',error)
        }else{
            res.status(200).send(result)
        }
    })
})

router.get('/:id',(req,res)=>{
    const id=req.params.id

    connection.query(`SELECT * FROM historialasignacion WHERE IDhda=${id}`,(error,result)=>{
        if(error){
            console.log("Error al obtener registro en MYSQL en tabla historialasignacion",error.message)
            res.status(500).send(error.message)
        }else{
            res.status(200).send(result)
        }
    })

})

router.delete('/delete/:id',(req,res)=>{
    const id=req.params.id

    connection.query(`DELETE FROM historialasignacion WHERE IDhda=${id}`,(error,result)=>{
        if(error){
            console.log("Error al eliminar registro en MYSQL en tabla historialasignacion",error.message)
            res.status(500).send(error.message)
        }else{
            res.status(200).send(result)
        }
    })
})

router.put('/update/:id',(req,res)=>{
    const id=req.params.id
    const historialasig=Object.values(req.body)
    const keyvalues=Object.keys(req.body)
    var l=""
    
    for (let i = 0; i < keyvalues.length; i++) {
        l+=`${keyvalues[i]}=?`
        
        if(i<keyvalues.length-1) l+=","
    }

    connection.query(`UPDATE historialasignacion SET ${l} WHERE IDhda=${id}`,historialasig,(error,result)=>{
        if(error){
            console.log("Error al updatear un registro en MYSQL en tabla historialasignacion ", error.message)
            res.status(500).send(error.message)
        }else{
            res.status(200).send(result)
        }
    })
})

module.exports=router