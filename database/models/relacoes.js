const Pessoa = require('./pessoas.js');
const Carro = require('./carros.js');

Pessoa.hasMany(Carro, { 
    foreignKey: 'pessoaId', 
    as: 'carros' 
});

Carro.belongsTo(Pessoa, { 
    foreignKey: 'pessoaId', 
    as: 'pessoa' 
});
