const Sequelize = require('sequelize');
const db = require('../conect/db.js');

const Carro = db.define('carros', {
    modelo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    marca: {
        type: Sequelize.STRING,
        allowNull: false
    },
    ano: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    preco: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    fotoLink: {
        type: Sequelize.STRING,
        allowNull: true
    }
});

module.exports = Carro;
