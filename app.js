const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');

// Importar rotas
const pessoasRoutes = require('./routes/pessoasRoutes');
const carrosRoutes = require('./routes/carrosRoutes');

// Criar aplicativo
const app = express();

// Configurar aplicativo
app.engine('handlebars', exphbs.engine({
    defaultLayout: 'main',
    partialsDir: path.join(__dirname, '/views/includes/')
}));
app.set('view engine', 'handlebars');

// Configurar middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configurar rotas
app.use('/pessoas', pessoasRoutes);
app.use('/carros', carrosRoutes);
app.use(express.static('public'));

module.exports = app;
