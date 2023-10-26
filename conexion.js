const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const port = 3000
const cors = require('cors');

app.use(cors({ origin: 'http://localhost:4200' }));

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


/* Conexion a la base de datos con mongo y mongoose */
mongoose.connect('mongodb://127.0.0.1:27017/seminario',
{useNewUrlParser:true,useUnifiedTopology:true})
    .then(()=>console.log('Base de datos conectada correctamente'))
    .catch(e=>console.log(e));

/* motor de plantillas plantillas de ejs*/


//Rutas web
app.use('/cliente', require('./backend/router/cliente'));
app.use('/amortizacion', require('./backend/router/amortizacion'));


app.use((req, res, next) => {
    /* res.status(404).sendFile(__dirname + "/public/404.html"); */
    res.status(404).render("404", {
        titulo: "Error 404 no se puede encontrar la pagina",
        descripcion: "El recurso que usted requiere no se puede encontrar"
    });
});

app.listen(port, () => {
    console.log('El servidor esta escuchando en el puerto', port);
});