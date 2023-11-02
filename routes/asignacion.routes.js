const router  = require("express").Router();
const connection = require("../db");

router.post('/create-asignacion',(req,res)=>{
    const asignacion=Object.values(req.body)

    connection.query(`INSERT INTO Asignacion(IDcurso,IDcargoVac,fechaAsignada,tipoSuplencia,inicioSuplencia,finSuplencia,IDdocente) VALUES(?,?,?,?,?,?,?)`,asignacion,(err,result)=>{
        if(err) res.status(500).send("Error al insertar registro en tabla Asignacion",err.message)
        else res.status(200).send(result)
    })
})

module.exports=router