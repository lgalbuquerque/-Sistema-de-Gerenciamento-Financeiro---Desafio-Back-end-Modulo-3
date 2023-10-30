const express = require('express');
const { cadastrarUsuario, loginUsuario } = require('./controladores/usuarios');
const validarToken = require('./intermediarios/validarToken');
const { detalharTransacao, cadastrarTransacao } = require('./controladores/transacoes');

const rotas =  express();

rotas.post('/usuario', cadastrarUsuario);
rotas.post('/login', loginUsuario);
rotas.use(validarToken);
rotas.get('/transacao/:id', validarToken, detalharTransacao);
rotas.post('/transacao', validarToken, cadastrarTransacao);


module.exports = rotas;