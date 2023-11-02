const router=require('express').Router()
const connection=require('../db')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const { verifyToken } = require('../helpers/jwtVerify')

router.post('/login',(req,res)=>{
    const secret=process.env.SECRET
    var user={}

    connection.query(`SELECT * FROM  usuario WHERE username='${req.body.usuario}'`,(err,result)=>{
        if(err){ return res.status(400).send('Usuario no existe o incorrecto')}
        else {
            user=result[0]

            const validatePassword=bcrypt.compare(req.body.userPassword,user.userPassword)
            if(!validatePassword) return res.status(400).send("Contraseña incorrecta")

            const token=jwt.sign(user,process.env.SECRET,{expiresIn:'1d'})

            return res.status(200).send({user,token})
        }
    })

})

router.post('/verifyToken',verifyToken,(req,res)=>{
    const user=req.user.username

    connection.query(`SELECT * FROM usuario WHERE username='${user}'`,(err,result)=>{
        if(err) return res.status(500).send(err)
        else return res.status(200).send(result)
    })
})

module.exports=router