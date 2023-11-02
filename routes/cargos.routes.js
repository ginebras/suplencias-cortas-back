const router = require('express').Router()
const connection=require('../db')

router.post('/create-cargo',(req,res)=>{
    const cargo=Object.values(req.body)
    const keyvalues=Object.keys(req.body)
    var values=""
    var counter=""
    
    for (let i = 0; i < keyvalues.length; i++) {
        values+=`${keyvalues[i]}`
        counter+="?"

        if(i<keyvalues.length-1){
            values+=","
            counter+=","
        }
    }

    connection.query(`INSERT INTO Cargos(${values}) VALUES (${counter})`,cargo,(error,result)=>{
        if(error){
            console.log("Error al insertar un registro en MYSQL en tabla Cargos ", error.message)
            res.status(500).send(error.message)
        }else{
            res.status(200).send(result)
        }
    })

})

router.get('/cargos',(req,res)=>{
    
    connection.query('SELECT * FROM Cargos',(error,result)=>{
        if(error){
            console.log('Error al obtener los registros en MySQL en tabla cargos: '+error.message)
            res.status(500).send('Error al obtener registros',err)
        }else{
            res.status(200).send(result)
        }
    })
})

router.get('/:id',(req,res)=>{
    const id=req.params.id

    connection.query(`SELECT * FROM Cargos WHERE IDcargo=${id}`,(error,result)=>{
        if(error){
            console.log("Error al obtener registro en MYSQL en tabla Cargos",error.message)
            res.status(500).send(error.message)
        }else{
            res.status(200).send(result)
        }
    })

})

router.delete('/delete-cargo/:id',(req,res)=>{
    const id=req.params.id

    connection.query(`DELETE FROM Cargos WHERE IDcargo=${id}`,(error,result)=>{
        if(error){
            console.log("Error al eliminar registro en MYSQL en tabla cargos",error.message)
            res.status(500).send(error.message)
        }else{
            res.status(200).send(result)
        }
    })
})

router.put('/update-cargo/:id',(req,res)=>{
    const id=req.params.id
    const cargo=Object.values(req.body)
    const keyvalues=Object.keys(req.body)
    var l=""
    
    for (let i = 0; i < keyvalues.length; i++) {
        l+=`${keyvalues[i]}=?`
        
        if(i<keyvalues.length-1) l+=","
    }

    connection.query(`UPDATE Cargos SET ${l} WHERE IDcargo=${id}`,cargo,(error,result)=>{
        if(error){
            console.log("Error al updatear un registro en MYSQL en tabla cargos ", error.message)
            res.status(500).send(error.message)
        }else{
            res.status(200).send(result)
        }
    })
})


module.exports=router