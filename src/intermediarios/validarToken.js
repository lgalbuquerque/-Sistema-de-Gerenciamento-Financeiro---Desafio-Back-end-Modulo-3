
const { verify } = require('jsonwebtoken');
const chaveJWT = require('../intermediarios/chavesecreta');

const validarToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ mensagem: 'Usuário não logado' });
  }
    verify(token, chaveJWT, (error, usuario) => {
    if (error) {
      return res.status(401).json({ mensagem: 'Token inválido ou expirado' });
    }
    req.usuario = usuario;
    next();
  });
};

module.exports = validarToken;