const express = require('express');

// Importar controladores
const carrosController = require('../controllers/carrosController');

// Importar services
const carrosService = require('../services/carrosService');

// Importar upload
const upload = carrosController.upload;

// Criar roteador
const router = express.Router();

// Definir rotas

// --- Rotas Render
router.get('/', carrosService.listarCarros);
router.get('/novo', carrosService.cadastrarCarros);

// --- Rotas API
router.post('/novo', carrosService.cadastrarCarro);

//router.post('/update/:id', carrosController.atualizarCarro);
//router.post('/delete/:id', carrosController.deletarCarro);
//router.post('/upload/:id', upload.single('imagem'), carrosController.uploadImagem);

module.exports = router;
