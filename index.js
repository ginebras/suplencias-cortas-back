const app=require("./app")
const mysql=require('mysql2')

const connection = mysql.createConnection({
    host:'localhost',
    port:3306,
    database:'SuplenciasCortas',
    user:'root',
    password:'45782694Alejo'
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