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

module.exports = router;