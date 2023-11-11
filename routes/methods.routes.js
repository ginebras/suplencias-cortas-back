const router=require('express').Router()
const connection=require('../db')

router.post('/dar-de-baja-cargo/:id',(req,res)=>{
    const id=req.params.id
    
    connection.query(`UPDATE cargos SET ocupado = 'FALSE' WHERE IDcargo=${id}`,(err,result)=>{
        if(err) return res.status(500).send('Error al modificar cargo '+err)

        connection.query(`SELECT codigoMateria,turnoCargo,horarioCargo FROM cargos WHERE IDcargo=${id}`,(error,cargoresult)=>{
            if(error) return res.status(500).send("Error al tomar un cargo "+error)
            const cargo=Object.values(cargoresult[0])

            connection.query("INSERT INTO cargovacante(codigoMateria,turnoCargoVac,horarioCargoVac) VALUES(?,?,?)",cargo,(error2,inserted)=>{
                if(error2) res.status(500).send(error2)
                return res.status(200).send(inserted)
                //FALTA CONTINUAR PARA BUSCAR CANDIDATOS
            })
        })
    })
})

router.get('/cargos-vacantes', (req,res)=>{
    connection.query("SELECT codigoMateria FROM cargovacante", (err,cargos)=>{
        if(err) res.status(500).send(err)

        const codigoMaterias=Object.values(cargos)
        const keyvalues=Object.keys(cargos)
        var l=""
        var container=[]

        for (let i = 0; i < keyvalues.length; i++) {
            l+=`?`
            container.push(codigoMaterias[i]['codigoMateria'])
            
            if(i<keyvalues.length-1) l+=","
        }

        connection.query(`SELECT * FROM materia WHERE codigoMateria IN (${l})`,container,(err,result)=>{
            if(err) res.status(500).send(err)

            res.status(200).send(result)
        })
    })
})

//REVISAR RUTA 
router.post('/cubrir-cargo/:cargoid/:docenteid',(req,res)=>{
    const cargoid=req.params.cargoid
    const docenteid=req.params.docenteid
    const values=Object.values(req.body)
    console.log(values)

    connection.query(`SELECT codigoMateria FROM cargovacante WHERE IDcargoVac=${cargoid}`,(errorCargo,resultCargo)=>{
        if(errorCargo) res.status(500).send(errorCargo)
        const codigoMateria=resultCargo[0]['codigoMateria']

        connection.query(`SELECT añoMateria FROM materia WHERE codigoMateria='${codigoMateria}'`,(materiaError,materiaResult)=>{
            if(materiaError) res.status(500).send(materiaError)
            const añoMateria=materiaResult[0]['añoMateria']

            connection.query(`SELECT IDcurso FROM cursos WHERE nombreCurso='${añoMateria}'`,(cursoError,cursoResult)=>{
                if(cursoError) res.status(500).send(cursoError)
                const idcurso=cursoResult[0]['IDcurso']

                connection.query(`INSERT INTO asignacion(IDcurso,IDcargoVac,fechaAsignada,tipoSuplencia,inicioSuplencia,finSuplencia,IDdocente) VALUES(${idcurso},${cargoid},'${values[0]}','${values[1]}','${values[2]}','${values[3]}',${docenteid})`,(err,result)=>{
                    if(err) return res.status(500).send(err)

                    return res.status(200).send(result)
                })
            })
        })
        
    })

})

module.exports=router;
