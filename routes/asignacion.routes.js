const router  = require("express").Router();
const connection = require("../db");

router.post('/create-asignacion',async (req,res)=>{
    const asignacion=Object.values(req.body)

    try{
        await connection.query(`INSERT INTO Asignacion(IDcurso,IDasignacionVac,fechaAsignada,tipoSuplencia,inicioSuplencia,finSuplencia,IDdocente) VALUES(?,?,?,?,?,?,?)`,asignacion,(err,result)=>{
            if(err) res.status(500).send("Error al insertar registro en tabla Asignacion",err.message)
            else res.status(200).send(result)
        })
    }catch(err){
        console.log("Catch: "+err)
    }
})

router.get('/asignaciones',(req,res)=>{
    
    connection.query('SELECT * FROM asignacion',(error,result)=>{
        if(error){
            console.log('Error al obtener los registros en MySQL en tabla asignacion: '+error.message)
            res.status(500).send('Error al obtener registros',err)
        }else{
            res.status(200).send(result)
        }
    })
})

router.get('/:id',(req,res)=>{
    const id=req.params.id

    connection.query(`SELECT * FROM asignacion WHERE IDasignacion=${id}`,(error,result)=>{
        if(error){
            console.log("Error al obtener registro en MYSQL en tabla asignacion",error.message)
            res.status(500).send(error.message)
        }else{
            res.status(200).send(result)
        }
    })

})

router.delete('/delete-cargo/:id',(req,res)=>{
    const id=req.params.id

    connection.query(`DELETE FROM asignacion WHERE IDasignacion=${id}`,(error,result)=>{
        if(error){
            console.log("Error al eliminar registro en MYSQL en tabla asignacion",error.message)
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

    connection.query(`UPDATE asignacion SET ${l} WHERE IDasignacion=${id}`,cargo,(error,result)=>{
        if(error){
            console.log("Error al updatear un registro en MYSQL en tabla asignacion ", error.message)
            res.status(500).send(error.message)
        }else{
            res.status(200).send(result)
        }
    })
})

module.exports=router