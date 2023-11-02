const jwt=require('jsonwebtoken')

const verifyToken=(req,res,next)=>{
    const tokenHeader=req.header('token')
    console.log(req.header)
    if(tokenHeader){
        const token=tokenHeader.split(" ")[1]
        console.log(token)
    }else{
        return res.status(401).send('Token no autenticada')
    }
}

module.exports={verifyToken}