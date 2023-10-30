create database
  dindin;

create table
  usuarios (
    id serial primary key,
    nome text not null,
    email text unique not null,
    senha varchar not null
  );

create table
  categorias (id serial primary key, descricao text not null);

create table
  transacoes (
    id serial primary key,
    descricao text not null,
    valor numeric(10, 2) not null,
    data date not null,
    categoria_id int references categorias (id) not null,
    usuario_id int references usuarios (id) not null,
    tipo text not null
  );
  
  insert into categorias (descricao) values
  ('Alimentação'),
  ('Assinaturas e Serviços'),
  ('Casa'),
  ('Mercado'),
  ('Cuidados Pessoais'),
  ('Educação'),
  ('Família'),
  ('Lazer'),
  ('Pets'),
  ('Presentes'),
  ('Roupas'),
  ('Saúde'),
  ('Transporte'),
  ('Salário'),
  ('Vendas'),
  ('Outras receitas'),
  ('Outras despesas');

  SELECT * FROM usuarios WHERE email = $1
  INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3) RETURNING *
  SELECT * FROM transacoes WHERE id = $1 AND usuario_id = $2
  SELECT nome FROM categorias WHERE id = $1
  INSERT INTO transacoes (tipo, descricao, valor, data, categoria_id, usuario_id)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id
