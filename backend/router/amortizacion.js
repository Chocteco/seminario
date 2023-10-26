const express = require('express');
const router = express.Router();
const amortizacion = require('../models/amortizacion')

/* Para cuando se obtienen los datos directamente de mongodb a traves del Schema */
/* Obtenemos todos los datos directamente de la base de datos mongo */
router.get('/', async (req, res) => {
    console.log("Entre")
    try {
        const arrayClienteDB = await amortizacion.find();
        console.log(arrayClienteDB)
        // console.log(arrayLibrosDB);
        // res.render("libros", { arrayLibros: arrayLibrosDB })
        res.json({jsonAmort:arrayClienteDB,intStatus:1})
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
        await amortizacion.create(body);
        /* Redireccionamos a donde se listan los libros */
        // res.redirect('/libros');
        res.json({res:'Amortizacion Exitosa insertada',intStatus:1})
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;