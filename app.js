const express=require('express')
const app=express()
const cors=require('cors')
const morgan=require("morgan")
const dotenv=require('dotenv').config()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(morgan('tiny'))
app.use(cors())

app.use('/api/docentes',require('./routes/docentes.route'))
app.use('/api/cargos',require('./routes/cargos.routes'))
app.use('/api/pde',require('./routes/plandeestudios.routes'))
app.use('/api/cursos',require('./routes/cursos.routes'))
app.use('/api/asignaciones',require('./routes/asignacion.routes'))
app.use('/api/auth',require('./routes/login.routes'))

module.exports=app