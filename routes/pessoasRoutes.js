const express = require('express');

// Importar services
const pessoasService = require('../services/pessoasService');

// Criar roteador
const router = express.Router();

// Definir rotas

// --- Rotas Render
router.get('/novo', pessoasService.cadastrarPessoas);
router.get('/', pessoasService.listarPessoas);

// --- Rotas API
router.post('/novo', pessoasService.cadastrarPessoa);
router.post('/update/:id', pessoasService.atualizarPessoa);
router.post('/delete/:id', pessoasService.deletarPessoa);

module.exports = router;
