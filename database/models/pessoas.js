const Sequelize = require('sequelize');
const db = require('../conect/db.js');

const Pessoas = db.define('pessoas', {
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    idade: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

module.exports = Pessoas;
