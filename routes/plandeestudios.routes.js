const router = require('express').Router()
const connection = require('../db')

router.post('/create-pde',(req,res)=>{
    const pde=Object.values(req.body)
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

    connection.query(`INSERT INTO planestudios(${values}) VALUES(${counter})`,pde,(err,result)=>{
        if(err){
            res.status(500).send("Error al insertar registro en MYSQL usando la tabla planestudios",err.message)
        }else{
            res.status(200).send(result)
        }
    })
})

module.exports=router