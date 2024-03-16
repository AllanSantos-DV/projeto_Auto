const db = require('./banco/db.js');

const Pessoas = db.define('pessoas', {
    nome: {
        type: db.Seq.STRING,
        allowNull: false
    },
    idade: {
        type: db.Seq.INTEGER,
        allowNull: false
    }
});

module.exports = Pessoas;
    