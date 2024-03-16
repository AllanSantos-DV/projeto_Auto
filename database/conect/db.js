const dotenv = require('dotenv').config();
const env = dotenv.parsed;

const Seq = require('sequelize');
const db = new Seq(env.DB_NAME, env.DB_USER, env.DB_PASSWORD, {
    host: env.DB_HOST,
    dialect: env.DB_DIALECT
});

db.authenticate().then(() => {
    console.log('Conectado com sucesso!');
}).catch(err => {
    console.error('Falha na conexão: ', err);
});

db.sync({ force: false })
    .then(() => {
        console.log("Banco de dados sincronizado");
    })
    .catch((err) => {
        console.error("Erro ao sincronizar o banco de dados: ", err);
    });

module.exports = db;