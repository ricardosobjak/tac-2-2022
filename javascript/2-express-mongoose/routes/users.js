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

// Atualizar um usuário
router.put('/:id', async (req, res) => {
  const json = req.body;
  const { id } = req.params; // const id = req.params.id;

  // Buscar no DB
  const user = await User.findById(id);
  //User.find({_id: id}); mesmo que a linha anterior

  if (user) {
    json.createdAt = user.createdAt;
    json.updatedAt = new Date();

    // Faz a validação
    const hasErros = new User(json).validateSync();
    if (hasErros) return res.status(400).json(hasErrors);

    await User.updateOne({ _id: id }, json); // Update
    res.json(json);
  }
  else {
    return res.sendStatus(404);
  }
});

// Deletar um usuario
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  const result = await User.deleteOne({ _id: id });

  if (result.deletedCount > 0) return res.send();
  else return res.status(404).send();
});


module.exports = router;
