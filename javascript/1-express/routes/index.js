const express = require('express');
const router = express.Router();

// Configurar uma rota da aplicação (Método GET do HTTP)
router.get('/', (request, response) => {
    console.log("Oba! Chegou uma requisição");

    response.send("OK cliente, sua requisição chegou!");
});

module.exports = router;