const express = require('express');
const morgan = require('morgan')
const cors = require('cors')

const taskRoutes = require('./routes/tasks.routes')


const app = express();

app.use(cors())
app.use(morgan('dev'));

//esto permitira que express pueda leer archivos json cada vez que se envie un json 
//a través del método POST
app.use(express.json());

app.use(taskRoutes)

//middleware permite crear un error comun para todo los errores que existen tasks.controller.js
app.use((err, req, res, next) => {
    return res.json({
        message: err.message
    })
})


app.listen(4000)
console.log('Servidor en puerto 4000')