const { query } = require("express");
const pool = require("../config/conexao");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");
const chaveJWT = require("../intermediarios/chavesecreta");

const cadastrarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res
      .status(400)
      .json({ mensagem: "Todos os campos são obrigatórios." });
  }

  try {
    let query = `SELECT * FROM usuarios WHERE email = $1`;
    let valores = [email];
    const { rowCount: emailExistente } = await pool.query(query, valores);
    if (emailExistente) {
      return res.status(400).json({
        mensagem: "Já existe usuário cadastrado com o e-mail informado.",
      });
    }
    const senhaCriptografada = await bcrypt.hash(senha, 15);

    query = `
      INSERT INTO
          usuarios (nome, email, senha)
      VALUES
          ($1, $2, $3)
      RETURNING *
    `;

    valores = [nome, email, senhaCriptografada];
    const { rows: usuariosCadastrados } = await pool.query(query, valores);
    const usuarioCadastrado = usuariosCadastrados[0];
    const { senha: _, ...retorno } = usuarioCadastrado;
    return res.status(201).json(retorno);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno no servidor" });
  }
};

const loginUsuario = async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res
      .status(400)
      .json({ mensagem: "E-mail e senha são obrigatórios." });
  }

  try {
    const resultado = await pool.query(
      "SELECT * FROM usuarios WHERE email = $1",
      [email]
    );
    const usuario = resultado.rows[0];

    if (!usuario) {
      return res
        .status(400)
        .json({ mensagem: "Usuário e/ou senha inválidos." });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida) {
      return res
        .status(400)
        .json({ mensagem: "Usuário e/ou senha inválidos." });
    }

    const token = sign({ id: usuario.id }, chaveJWT, { expiresIn: "2h" });

    const usuarioAutenticado = {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
    };
    return res.status(200).json({ usuario: usuarioAutenticado, token });
  } catch (error) {
    return res.status(500).json({ mensagem: "Ocorreu um erro interno." });
  }
};

module.exports = {
  cadastrarUsuario,
  loginUsuario,
};
