const { db, Seq } = require('../conect/db.js');

const Carro = db.define('carros', {
    modelo: {
        type: Seq.STRING,
        allowNull: false
    },
    marca: {
        type: Seq.STRING,
        allowNull: false
    },
    ano: {
        type: Seq.INTEGER,
        allowNull: false
    },
    preco: {
        type: Seq.FLOAT,
        allowNull: false
    },
    fotoLink: {
        type: Seq.STRING,
        allowNull: true
    }
});

module.exports = Carro;
