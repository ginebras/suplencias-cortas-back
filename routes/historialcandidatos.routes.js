const router=require('express').Router()
const connection=require('../db')

router.post('/create',(req,res)=>{
    const historialcandi=Object.values(req.body)

    connection.query('INSERT INTO historialcandidatos(fechaCandidatos,IDcargo,IDdocente) VALUES(?,?,?)',historialcandi,(err,result)=>{
        if(err){
            console.log('Error al insertar registro en MySQL en tabla historialcandidatos: '+err.message)
            res.status(500).send('Error al insertar',err)
        }else{
            res.status(200).send('Insercion exitosa en tabla historialcandidatos')
        }
    })
})

router.get('/historialcandidatos',(req,res)=>{
    
    connection.query('SELECT * FROM historialcandidatos',(error,result)=>{
        if(error){
            console.log('Error al obtener los registros en MySQL en tabla historialcandidatos: '+error.message)
            res.status(500).send('Error al obtener registros',error)
        }else{
            res.status(200).send(result)
        }
    })
})

router.get('/:id',(req,res)=>{
    const id=req.params.id

    connection.query(`SELECT * FROM historialcandidatos WHERE IDcandidatos=${id}`,(error,result)=>{
        if(error){
            console.log("Error al obtener registro en MYSQL en tabla historialcandidatos",error.message)
            res.status(500).send(error.message)
        }else{
            res.status(200).send(result)
        }
    })

})

router.delete('/delete/:id',(req,res)=>{
    const id=req.params.id

    connection.query(`DELETE FROM historialcandidatos WHERE IDcandidatos=${id}`,(error,result)=>{
        if(error){
            console.log("Error al eliminar registro en MYSQL en tabla historialcandidatos",error.message)
            res.status(500).send(error.message)
        }else{
            res.status(200).send(result)
        }
    })
})

router.put('/update/:id',(req,res)=>{
    const id=req.params.id
    const historialcandi=Object.values(req.body)
    const keyvalues=Object.keys(req.body)
    var l=""
    
    for (let i = 0; i < keyvalues.length; i++) {
        l+=`${keyvalues[i]}=?`
        
        if(i<keyvalues.length-1) l+=","
    }

    connection.query(`UPDATE historialcandidatos SET ${l} WHERE IDcandidatos=${id}`,historialcandi,(error,result)=>{
        if(error){
            console.log("Error al updatear un registro en MYSQL en tabla historialcandidatos ", error.message)
            res.status(500).send(error.message)
        }else{
            res.status(200).send(result)
        }
    })
})

module.exports=router