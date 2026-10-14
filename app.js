// Servidor http

const http=require('http')
const { json } = require('stream/consumers')
const server =http.createServer((request, response)=>{
    try {
    if(request.url=='/'&&request.method=='GET') {
        response.end(JSON.stringify({"message":"Accediendo al servidor"}))
    } else if (request.url=='/home'&&request.method=='GET'){
        response.statusCode=200
        
        response.end(JSON.stringify({"message": "ACCEDIENDO A HOME"}))
    } else {
        response.statusCode=404
        
        response.end(JSON.stringify({"message":"No encontrado"}))
    }
    } catch(error){
        response.statusCode=5000
        response.end(JSON.stringify({"message":"Ha ocurrido un servidor en el servidor"}))
    }
})

const port=5000
const host="localhost"

server.listen(port, host,()=>{
    console.log(`servidor ejecutandose en http://${host}:${port}`)
})