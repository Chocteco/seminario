const express = require('express');
const router = express.Router();
const cliente = require('../models/cliente')

/* Para cuando se obtienen los datos directamente de mongodb a traves del Schema */
/* Obtenemos todos los datos directamente de la base de datos mongo */
router.get('/', async (req, res) => {
    console.log("Entre")
    try {
        const arrayClienteDB = await cliente.find();
        console.log(arrayClienteDB)
        // console.log(arrayLibrosDB);
        // res.render("libros", { arrayLibros: arrayLibrosDB })
        res.json({jsonClient:arrayClienteDB,intStatus:1})
    } catch (error) {
        console.log(error)

    }
});

router.post('/', async (req, res) => {
    const body = req.body;
    console.log(body); 
    try {
        /* primera forma de insercion en la base de datos */
        /* const libroDB = new Libro(body)
        await libroDB.save()
        console.log('Datos del libro nuevo insertado '+libroDB) */

        /* segunda forma de insercion de datos en mongo */
        await cliente.create(body);
        /* Redireccionamos a donde se listan los libros */
        // res.redirect('/libros');
        res.json({res:'Usuario Exitoso insertado',intStatus:1})
    } catch (error) {
        console.log(error);
    }
});

/* Para cuando se mandan los arreglos de forma estática 
router.get('/', (req, res)=>{
    res.render("libros",{
        arrayLibros:[
            {isbn:1, titulo:'El principito', autor:'Antoine de Saint-Exupéry',anio:1943,editorial:'Tomo Books Mx'},
            {isbn:2, titulo:'Algebra de Baldor', autor:'Aurelio Baldor',anio:2010,editorial:'AlfaOmega'}

        ]
    })
}); */



module.exports = router;