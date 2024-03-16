const db = require('./banco/db.js');

const Carro = db.define('carros', {
    modelo: {
        type: db.Seq.STRING,
        allowNull: false
    },
    marca: {
        type: db.Seq.STRING,
        allowNull: false
    },
    ano: {
        type: db.Seq.INTEGER,
        allowNull: false
    },
    preco: {
        type: db.Seq.FLOAT,
        allowNull: false
    },
    fotoLink: {
        type: db.Seq.STRING,
        allowNull: true
    }
});

module.exports = Carro;
