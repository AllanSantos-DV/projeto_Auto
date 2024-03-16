// importando o arquivo de conexão com o banco de dados
const db = require('./database/conect/db.js');


// importando os models
require('./database/models/pessoas.js');
require('./database/models/carros.js');
require('./database/models/relacoes.js');


// sincronizando o banco de dados
db.sync({ force: false })
  .then(() => console.log('Tabelas e relações criadas com sucesso'))
  .catch(error => console.log('Erro ao criar tabelas e relações: ', error));
