const express = require('express');

// Importar controladores
const pessoasController = require('../controllers/pessoasController');

// Importar services
const pessoasService = require('../services/pessoasService');

// Criar roteador
const router = express.Router();

// Definir rotas

// --- Rotas Render
router.get('/', pessoasService.listarPessoas);
router.get('/novo', pessoasService.cadastrarPessoas);

// --- Rotas API
router.post('/novo', pessoasService.cadastrarPessoa);
router.post('/update', pessoasService.atualizarPessoa);
router.post('/delete/:id', pessoasService.deletarPessoa);


router.get('/:id', pessoasController.obterPessoa);
router.put('/:id', pessoasController.atualizarPessoa);
router.get('/:id/carros', pessoasController.obterCarrosDaPessoa);

module.exports = router;
