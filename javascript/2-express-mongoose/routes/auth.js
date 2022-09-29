const express = require('express');
const User = require('../models/User');
const router = express.Router();

const jwt = require('jsonwebtoken');

const EXPIRES = 86400; // Tempo default do token

// Função para gerar o token
function generateToken(params = {}, timeout = EXPIRES) {
    return jwt.sign(params, process.env.SECRETKEY, {
        expiresIn: timeout
    });
}

router.post('/', async (req, res) => {
    const { login, password } = req.body;

    const user = await User.findOne({ login, password });

    if (user) {
        return res.json({ token: generateToken({ login }) });
    }
    return res.status(400).json({ message: "Usuário e/ou senha inválidos" });
});

module.exports = router;