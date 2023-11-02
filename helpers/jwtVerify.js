const jwt=require('jsonwebtoken')

const verifyToken=(req,res,next)=>{
    const tokenHeader=req.header('Authorization')
    if(tokenHeader){
        const token=tokenHeader.split(" ")[1]
        jwt.verify(token,process.env.SECRET,(error,user)=>{
            if(error) return res.status(500).send(error)
            req.user=user
            next()
        })
    }else{
        return res.status(401).send('Token no autenticada')
    }
}

module.exports={verifyToken}