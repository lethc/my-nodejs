const express=require('express')
const app=express()
const userRouter = require('./routers/userRouters')
const path=require('path')


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

app.listen(3000,()=>{
    console.log("Aplicacion con express ejecutandose en el puerto 3000")
})