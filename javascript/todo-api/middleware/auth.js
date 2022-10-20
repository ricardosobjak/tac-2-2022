require('dotenv').config();
const jwt = require('jsonwebtoken');
const { User } = require('../database/models')


/**
 * Middleware para verificar se o cliente está passando uma autenticação válida
 * para executar a requisição HTTP.
 * 
 * @param {*} req Objeto contendo os dados da requisição HTTP.
 * @param {*} res Objeto contendo os dados de resposta HTTP.
 * @param {*} next Próxima função a ser executada na fila de processos.
 * @returns 
 */
const isAuthorized = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(403).json({ category: 'authentication', message: 'No authentication token' });
  }

  jwt.verify(authorization, process.env.SECRET, (err, decoded) => {
    console.log(decoded);
    if (err) return res.status(401).json({ category: 'authentication', message: 'Failed to authenticate token' });

    // se tudo estiver ok, salva no request para uso posterior
    User.findByPk(decoded.id, {
      attributes: ['id', 'name', 'email', 'login', 'type']
    }).then(user => {
      if (user) {
        req.user = user.dataValues;
        return next();
      }
      return res.status(401).json({ category: 'authentication', message: 'Invalid user' });
    }).catch((findErr) => {
      console.log(findErr);
    });
  });
};



/**
 * Middleware para verificar se a requisição é feita por um administrador.
 * 
 * @param {*} req Objeto contendo os dados da requisição HTTP.
 * @param {*} res Objeto contendo os dados de resposta HTTP.
 * @param {*} next Próxima função a ser executada na fila de processos.
 * @returns 
 */
const isAdmin = async (req, res, next) => {
  const { type } = req.user;

  return type == 'admin'
    ? next()
    : res.status(403).json({ category: 'authorization', message: 'No authorized, only administrator.' });
};



/**
 * Middleware para verificar se a requisição é feita por um administrador ou
 * pelo criador (proprietário) do recurso requisitado.
 * 
 * @param {*} req Objeto contendo os dados da requisição HTTP.
 * @param {*} res Objeto contendo os dados de resposta HTTP.
 * @param {*} next Próxima função a ser executada na fila de processos.
 * @returns 
 */
const isAdminOrOwner = async (req, res, next) => {
  const { id, type } = req.user;

  return type == 'admin' || id == req.params.id
    ? next()
    : res.status(403).json({ category: 'authorization', message: 'No authorized.' });
};

module.exports = { isAuthorized, isAdmin, isAdminOrOwner };