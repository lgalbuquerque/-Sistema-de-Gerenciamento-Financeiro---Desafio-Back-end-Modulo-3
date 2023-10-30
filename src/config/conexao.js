const { Pool } = require('pg');
const { host, port, user, password, database } = require('../dadosSensiveis');

const pool = new Pool({
    host,
    port,
    user,
    password,
    database
});

module.exports = pool;