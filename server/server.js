import express from 'express'
import mysql from 'mysql2'

const mysql_host = process.env.MYSQL_HOST
const mysql_port = process.env.MYSQL_PORT ? Number(process.env.PORT) : 3306
const mysql_database = process.env.MYSQL_DATABASE
const mysql_user = process.env.MYSQL_USER
const mysql_pwd = process.env.MYSQL_PASSWORD

const app = express()

// Create the database connection
try {
    const connection = mysql.createConnection({
        host: mysql_host,
        port: mysql_port,
        user: mysql_user,
        password: mysql_pwd,
        database: mysql_database,
    })

    // CORS stuff
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*")
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
        next()
    })

    // Serve frontend
    app.use(express.static('/public'))

    // Routes
    app.get('/demo', (req, res) => {
        connection.execute('SELECT * from data WHERE 1 = 1;', (_err, rows) => res.send(rows))
    })

    // Listen
    app.listen(3333, '0.0.0.0', () => {
        console.log(`[ ready ] http://localhost:3333`)
    })
} catch (e) {
    console.error(e)
}

