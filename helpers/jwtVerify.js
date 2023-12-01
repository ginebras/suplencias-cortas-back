const jwt=require('jsonwebtoken')
const expressJwt=require('express-jwt');

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

//ADMIN DIRE,SECRES,VICEDIRES
//SEMIN ADMIN PRECES ADMINISTRATIVOS

const verifyAdmin=(req,res,next)=>{
	verifyToken(req,res,()=>{
		if(req.user.isAdmin){
			next()
		}else{
			res.status(403).send('not allowed');
		}
	})
}

const authJwt=()=>{
	return expressJwt({
		secret:process.env.SECRET,
		algorithms:['HS256'],
	}).unless({
		path:[
			{ url:/\/api\/auth(.*)/ ,methods:['GET','POST','PUT','DELETE','OPTIONS']},
			
		]
	})
}

module.exports={verifyToken,verifyAndAuthorizeToken,verifyAdmin,authJwt}