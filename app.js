const express=require('express')
const app=express()
// Routers de users, auth y dashboard desactivados: mientras esten comentados
// (aqui y en los app.use de abajo) /users, /auth y /dashboard responden 404
// const userRouter = require('./routers/userRouters')
const productRouter = require('./routers/productRouters')
const categoryRouter = require('./routers/categoryRouters')
const supplierRouter = require('./routers/supplierRouters')
const customerRouter = require('./routers/customerRouters')
// const authRouter = require('./routers/authRouters')
// const dashboardRouter = require('./routers/dashboardRouter')
const socket = require('socket.io')

// Socket.IO necesita un servidor HTTP propio para compartir el puerto con Express,
// por eso se crea aqui con createServer(app) y al final se usa server.listen en vez de app.listen
const server = require('http').createServer(app)
const io = socket(server)
// Los eventos de socket se definen en socket.js, que recibe la instancia io
require('./socket')(io)

const path=require('path')
const connection=require('./database/connection')


app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// Sirve el frontend estatico de la carpeta public (login.html, panel.html, css y js)
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res)=>{
    // index.ejs usa la variable title, por lo que debe pasarse al renderizar
    res.render('index', { title: 'Chat' })
})



// para que funcione en formato get
// app.get('/', (req, res)=>{
//     console.log("Servidor Creado con express.js")
// })

app.use(express.json())

// app.use('/users', userRouter)
app.use('/productos', productRouter)
app.use('/categorias', categoryRouter)
app.use('/proveedores', supplierRouter)
app.use('/clientes', customerRouter)
// app.use('/auth', authRouter)
// app.use('/dashboard', dashboardRouter)

server.listen(3000,()=>{
    console.log("Aplicacion con express ejecutandose en el puerto 3000")
})
