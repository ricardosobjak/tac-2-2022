const express = require('express');
const router = express.Router();

/**
 * Obter todas as pessoas da API
 */
 router.get('/', (req, res) => {
    const pessoas = [{ nome: "Ana" }, { nome: "Juca" }];

    res.json(pessoas); // Converte objetos para JSON e envia ao cliente
});

/**
 * Criar uma pessoa na API
 */
router.post('/', (req, res) => {
    const pessoa = req.body;

    console.log(pessoa);
    pessoa.id = new Date().getTime();
    res.json(pessoa);
});

router.put('/:id', (req, res) => {
    console.log("Atualizando", req.params.id);
    res.send('');
});

router.delete('/:id', (req, res) => {
    console.log("Deletando", req.params.id);
    console.log(req);
    res.send('');
});



module.exports = router;