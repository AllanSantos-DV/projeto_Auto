const { db, Seq } = require('../conect/db.js');

const Pessoas = db.define('pessoas', {
    nome: {
        type: Seq.STRING,
        allowNull: false
    },
    idade: {
        type: Seq.INTEGER,
        allowNull: false
    }
});

module.exports = Pessoas;
