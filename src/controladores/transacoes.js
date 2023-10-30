const { query } = require("express");
const pool = require("../config/conexao");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");
const chaveJWT = require("../intermediarios/chavesecreta");

const detalharTransacao = async (req, res) => {
  const transacaoId = req.params.id;
  const usuarioId = req.usuario.id;

  try {
    const query = `SELECT * FROM transacoes WHERE id = $1 AND usuario_id = $2`;
    const values = [transacaoId, usuarioId];
    const result = await pool.query(query, values);

    if (result.rowCount === 0) {
      return res.status(404).json({ mensagem: "Transação não encontrada." });
    }

    const transacao = result.rows[0];
    return res.status(200).json(transacao);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno no servidor" });
  }
};

const cadastrarTransacao = async (req, res) => {
  const { tipo, descricao, valor, data, categoria_id } = req.body;
  const usuario_id = req.usuario.id;

  if (!tipo || !descricao || !valor || !data || !categoria_id) {
    return res
      .status(400)
      .json({ mensagem: "Todos os campos obrigatórios devem ser informados." });
  }

  try {
    const query_categoria = `SELECT nome FROM categorias WHERE id = $1`;
    const values_categoria = [categoria_id];
    const resultado = await pool.query(query_categoria, values_categoria);

    if (resultado.rowCount === 0) {
      return res.status(400).json({ mensagem: "Categoria não encontrada." });
    }

    const categoriaExistente = resultado.rows[0];

    const transacaoQuery = `
        INSERT INTO transacoes (tipo, descricao, valor, data, categoria_id, usuario_id)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id
      `;

    const transacaoValues = [
      tipo,
      descricao,
      valor,
      data,
      categoria_id,
      usuario_id,
    ];
    const transacaoResult = await pool.query(transacaoQuery, transacaoValues);

    if (transacaoResult.rowCount === 0) {
      return res
        .status(500)
        .json({ mensagem: "Erro ao cadastrar a transação." });
    }

    const novoId = transacaoResult.rows[0].id;
    const transacaoCadastrada = {
      id: novoId,
      tipo,
      descricao,
      valor,
      data,
      categoria_id,
      usuario_id,
      categoria_nome: categoriaExistente.nome,
    };

    return res.status(201).json(transacaoCadastrada);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno no servidor" });
  }
};

module.exports = {
  detalharTransacao,
  cadastrarTransacao,
};
