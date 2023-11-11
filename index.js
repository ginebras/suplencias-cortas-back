const app=require("./app")
const mysql=require('mysql2')

const connection = mysql.createConnection({
    host:process.env.HOST_MYSQL,
    port:process.env.PORT_MYSQL,
    database:process.env.DATABASE_MYSQL,
    user:process.env.USER_MYSQL,
    password:process.env.PASSWORD_MYSQL
})

connection.connect((err)=>{
    if(err) {
        console.log(err)
    }else{
        console.log('mysql connection up')

        const server= app.listen(3700,()=>{
            console.log(`Listening at ${server.address().port}`)
        })
    }
})