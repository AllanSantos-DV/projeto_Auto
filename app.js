const express = require('express');

// Importar rotas
const pessoasRoutes = require('./routes/pessoasRoutes');
const carrosRoutes = require('./routes/carrosRoutes');

// Criar aplicativo
const app = express();

// Configurar aplicativo
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Configurar rotas
app.use('/pessoas', pessoasRoutes);
app.use('/carros', carrosRoutes);

module.exports = app;
