const mysql=require('mysql2')

const connection = mysql.createConnection({
    host: process.env.HOST_MYSQL,
    port: process.env.PORT_MYSQL,
    database: process.env.DATABASE_MYSQL,
    user: process.env.USER_MYSQL,
    password: process.env.PASSWORD_MYSQL
})

module.exports=connection