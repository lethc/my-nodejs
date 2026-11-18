const fs = require('node:fs')
const path = require('node:path')

// Node 22 carga .env solo en el servidor; la clave nunca se envia a la vista.
const envFile = path.join(__dirname, '.env')
if (fs.existsSync(envFile)) require('node:process').loadEnvFile(envFile)

module.exports={
    openrouter: {
        apiKey: process.env.OPENROUTER_API_KEY || '',
        model: process.env.OPENROUTER_MODEL || 'openrouter/free'
    },
    db:{
        host: "127.0.0.1",
        user: "",
        password: '',
        database: 'mydb02',
        port: 27017
    }
}
