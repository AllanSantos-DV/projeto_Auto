// Importa o módulo do servidor e inicializa o banco de dados
const app = require('./app');
const initDb = require('./init');

const PORT = process.env.PORT || 3000;

// Inicializa o banco de dados e o servidor HTTP
initDb().then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    });
}).catch(error => {
    console.error('Erro ao inicializar o banco de dados:', error);
});
