const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const session = require('express-session');
const flash = require('connect-flash');

// Importar rotas
const pessoasRoutes = require('./routes/pessoasRoutes');
const carrosRoutes = require('./routes/carrosRoutes');

// Criar aplicativo
const app = express();

const hbs = exphbs.create({
    defaultLayout: 'main',
    partialsDir: path.join(__dirname, '/views/includes/'),
    helpers: {
        eq: function(a, b) {
            return a === b;
        },
        contains: function(array, value) {
            let result = array.some(item => item.nome.toLowerCase().includes(value.toLowerCase()));
            return result;
        }
    }
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Configuração da sessão
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === 'production'}
}));

// Configuração do flash
app.use(flash());

// Middleware para disponibilizar as mensagens flash para todas as rotas
app.use((req, res, next) => {
    res.locals.messages = req.flash();
    next();
});

// Configurar middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configurar rotas
app.use('/pessoas', pessoasRoutes);
app.use('/carros', carrosRoutes);
app.use(express.static('public'));

module.exports = app;
