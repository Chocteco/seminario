const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    /* console.log("La ruta es "+__dirname);
    res.send('Respuesta dada desde un servidor con express ahora mismo');
    res.json({respuesta:"Estoy enviando un servicio a traves de json"}) */
    res.render("index", { titulo: "Enviando datos con EJS y Node" });
});

router.get('/servicios', (req, res) => {
    res.render("servicios", { tituloservicios: "Estas en la pagina de servicios" });
});

module.exports= router;