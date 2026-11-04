const express=require('express')
const app=express()
const userRouter = require('./routers/userRouters')
const productRouter = require('./routers/productRouters')
const categoryRouter = require('./routers/categoryRouters')
const supplierRouter = require('./routers/supplierRouters')
const customerRouter = require('./routers/customerRouters')
const path=require('path')
const connection=require('./database/connection')


app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.get('/', (req, res)=>{
    const data={
        "title":"Titulo de la página",
        "message":"Bienvenido a mi sitio Web",
        "showMessage":true,
        "items":[1,2,3,4,5]
    }
    res.render('index', data)
})



// para que funcione en formato get
app.get('/', (req, res)=>{
    console.log("Servidor Creado con express.js")
})

app.use(express.json())

app.use('/users', userRouter)
app.use('/productos', productRouter)
app.use('/categorias', categoryRouter)
app.use('/proveedores', supplierRouter)
app.use('/clientes', customerRouter)

app.listen(3000,()=>{
    console.log("Aplicacion con express ejecutandose en el puerto 3000")
})