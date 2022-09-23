const express = require('express');
const User = require('../models/User');
const router = express.Router();

/**
 * Obter todos os usuários
 */
router.get('/', async function (req, res, next) {
  res.json(await User.find());
});

/**
 * Obter um usuário pelo ID
 */
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id);

  return user 
    ? res.json(user)
    : res.sendStatus(404);
})

/**
 * Cadastro de Usuário
 */
router.post('/', async (req, res) => {
  const json = req.body;

  if ((await User.countDocuments({ login: json.login })) == 0) {
    const user = new User(json);
    const hasErrors = user.validateSync(); // Faz validação do schema
    
    return hasErrors
      ? res.status(400).json(hasErrors) // Envia mensagem de erro ao cliente
      : res.json(await user.save()); // Salva no DB e envia objeto ao cliente
  }
  else {
    res.status(400).json({ message: 'Login existente' });
  }


});

module.exports = router;
