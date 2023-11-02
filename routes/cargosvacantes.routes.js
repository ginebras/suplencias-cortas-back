const connection = require('../db')
const router=require('express').Router()

router.post('/create-cargovacante',(req,res)=>{
    const cargovac=Object.values(req.body)

    connection.query("INSERT INTO cargovacante(codigoMateria,turnoCargoVac,horarioCargoVac,IDdocente) VALUES(?,?,?,?)",cargovac,(err,result)=>{
        if(err) return res.status(500).send("Error al insertar registro en tabla CARGOSVACANTES"+err.message)
        else res.status(200).send(result)
    })
})

router.get('/getvacantes',(req,res)=>{
    connection.query("SELECT * FROM cargovacante",(err,result)=>{
        if(err) return res.status(500).send("Error al gettear registros en tabla CARGOSVACANTES"+err.message)
        else res.status(200).send(result)
    })
})

router.get('/:id',(req,res)=>{
    const id=req.params.id

    connection.query(`SELECT * FROM cargovacante WHERE IDcargoVac=${id}`,(err,result)=>{
        if(err) return res.status(500).send("Error al gettear un registro en tabla CARGOSVACANTES"+err.message)
        else res.status(200).send(result)
    })
})

router.delete('/delete/:id',(req,res)=>{
    const id=req.params.id

    connection.query(`DELETE FROM cargovacante WHERE IDcargoVac=${id}`,(error,result)=>{
        if(error){
            console.log("Error al eliminar registro en MYSQL en tabla cargovacante"+error.message)
            res.status(500).send(error.message)
        }else{
            res.status(200).send(result)
        }
    })
})

router.put('/update/:id',(req,res)=>{
    const id=req.params.id
    const cargovac=Object.values(req.body)
    const keyvalues=Object.keys(req.body)
    var l=""
    
    for (let i = 0; i < keyvalues.length; i++) {
        l+=`${keyvalues[i]}=?`
        
        if(i<keyvalues.length-1) l+=","
    }

    connection.query(`UPDATE cargovacante SET ${l} WHERE IDcargoVac=${id}`,cargovac,(error,result)=>{
        if(error){
            console.log("Error al updatear un registro en MYSQL en tabla cargovacante "+ error.message)
            res.status(500).send(error.message)
        }else{
            res.status(200).send(result)
        }
    })
})

module.exports=router