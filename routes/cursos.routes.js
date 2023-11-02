const connection = require("../db")
const router  = require("express").Router()

router.post('/create-curso',(req,res)=>{
    const curso=Object.values(req.body)

    connection.query(`INSERT INTO Cursos(nombreCurso,cicloLectivo,IDpde) VALUES(?,?,?)`,curso,(err,result)=>{
        if(err) res.status(500).send('Error al insertar registro en tabla Cursos',err.message)
        else res.status(200).send(result)
    })
})

module.exports=router