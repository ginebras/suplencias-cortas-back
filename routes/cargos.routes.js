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

module.exports=router