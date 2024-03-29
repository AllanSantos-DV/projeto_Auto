const app = require('./configs/app');
const initDb = require('./configs/init');

const PORT = process.env.PORT || 3000;

// Inicializa o banco de dados e o servidor HTTP
initDb().then(() => {
    app.listen(PORT, () => {
        console.log(`http://localhost:${PORT}/pessoas`);
    });
}).catch(error => {
    console.error('Erro ao inicializar o banco de dados:', error);
});
