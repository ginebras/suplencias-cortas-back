const router=require('express').Router()
const connection=require('../db')

router.post('/create-docente',(req,res)=>{
    const docente=Object.values(req.body)

    console.log(docente)

    connection.query('INSERT INTO Docentes(nombreDocente,apellidoDocente,emailDocente,telefonoDocente,antiguedadEscolar,antiguedadDocencia,legajo,DNIdocente,cuilDocente,calleDocente,localidad,alturaDocente,PIDtitular,nacimientoDocente) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)',docente,(err,result)=>{
        if(err){
            console.log('Error al insertar registro en MySQL en tabla docentes: '+err.message)
            res.status(500).send('Error al insertar',err)
        }else{
            res.status(200).send('Insercion exitosa en tabla docentes')
        }
    })
})

router.get('/docentes',(req,res)=>{
    
    connection.query('SELECT * FROM Docentes',(error,result)=>{
        if(error){
            console.log('Error al obtener los registros en MySQL en tabla docentes: '+error.message)
            res.status(500).send('Error al obtener registros',err)
        }else{
            res.status(200).send(result)
        }
    })
})

router.get('/:id',(req,res)=>{
    const id=req.params.id

    connection.query(`SELECT * FROM Docentes WHERE IDdocente=${id}`,(error,result)=>{
        if(error){
            console.log("Error al obtener registro en MYSQL en tabla Docentes",error.message)
            res.status(500).send(error.message)
        }else{
            res.status(200).send(result)
        }
    })

})

router.delete('/delete-docente/:id',(req,res)=>{
    const id=req.params.id

    connection.query(`DELETE FROM Docentes WHERE IDdocente=${id}`,(error,result)=>{
        if(error){
            console.log("Error al eliminar registro en MYSQL en tabla Docentes",error.message)
            res.status(500).send(error.message)
        }else{
            res.status(200).send(result)
        }
    })
})

router.put('/update-docente/:id',(req,res)=>{
    const id=req.params.id
    const docente=Object.values(req.body)
    const keyvalues=Object.keys(req.body)
    var l=""
    
    for (let i = 0; i < keyvalues.length; i++) {
        l+=`${keyvalues[i]}=?`
        
        if(i<keyvalues.length-1) l+=","
    }

    connection.query(`UPDATE Docentes SET ${l} WHERE IDdocente=${id}`,docente,(error,result)=>{
        if(error){
            console.log("Error al updatear un registro en MYSQL en tabla Docentes ", error.message)
            res.status(500).send(error.message)
        }else{
            res.status(200).send(result)
        }
    })
})

module.exports=router