var express = require('express');
var router = express.Router();

const { User } = require('../database/models');
const { isAdmin, isAdminOrOwner, isAuthorized } = require('../middleware/auth');

/**
 * Definição de rota no Express para entregar todos os usuários armazenados no Banco de dados.
 * Requisitos de segurança: Ter um token válido (isAuthorized) e ser adminitrador (isAdmin).
 * 
 * Resposta HTTP:
 *  -Body: array de objetos (User).
 */
router.get('/', isAuthorized, isAdmin, async (req, res) => {
  return res.json(await User.findAll({
    attributes: { exclude: ['password'] }
  }));
});


/**
 * Definição de rota no Express para entregar um usuário pelo ID.
 * Requisitos de segurança: Ter um token válido (isAuthorized) e ser 
 * adminitrador ou o criador do objeto (isAdminOrOwner).
 * 
 * Resposta HTTP:
 *  -Body: Um objeto (User).
 * 
 */
router.get('/:id', isAuthorized, isAdminOrOwner, async (req, res) => {
  const { id } = req.params;

  let user = await User.findByPk(id, {
    attributes: { exclude: ['password'] },
    include: [{
      association: 'todos',
      attributes: { exclude: ['userId'] }
    }]
  });

  return user ? res.json(user) : res.status(404).json({ message: "User not found" });
});


/**
 * Definição de rota no Express para entregar criar um usuário.
 * Requisitos de segurança: nenhuma.
 * 
 * Resposta HTTP:
 *  -Body: Um objeto (User).
 */
router.post('/', async (req, res) => {
  const { email } = req.body;

  try {
    //if (await Person.findOne({ where: { email } }))
    //  return res.status(400).send("User already exists")

    let user = await User.create(req.body);
    return res.status(200).json(user);
  } catch (e) {
    return res.status(400).send(e);
  }
});


/**
 * Definição de rota no Express para atualizar um usuário.
 * Requisitos de segurança: Ter um token válido (isAuthorized) e ser 
 * adminitrador ou o criador do objeto (isAdminOrOwner).
 * 
 * Resposta HTTP:
 *  -Body: Um objeto (User). 
 */
router.put('/:id', isAuthorized, isAdminOrOwner, async (req, res) => {
  const { name, email, login, birth, type } = req.body;
  const { id } = req.params;

  try {
    let user = await User.findByPk(id);
    if (!user) return res.status(400).json({ message: 'User not found!' });

    await user.update({ name, email, login, birth, type });
    return res.json(user);
  } catch (e) {
    return res.status(400).json(e);
  }
});


/**
 * Definição de rota no Express para deletar um usuário.
 * Requisitos de segurança: Ter um token válido (isAuthorized) e ser 
 * adminitrador ou o criador do objeto (isAdminOrOwner).
 * 
 * Resposta HTTP:
 *  -Body: Vazio.
 */
router.delete('/:id', isAuthorized, isAdminOrOwner, async (req, res) => {
  const { id } = req.params;

  try {
    let user = await User.findByPk(id);
    if (!user) return res.status(400).json({ message: 'User not found!' });

    await user.destroy();
    return res.send();
  } catch (e) {
    return res.status(400).json(e);
  }
});

module.exports = router;