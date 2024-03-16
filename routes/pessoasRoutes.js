const express = require('express');

// Importar controladores
const pessoasController = require('../controllers/pessoasController');

// Importar services
const pessoasService = require('../services/pessoasService');

// Criar roteador
const router = express.Router();

// Definir rotas
router.get('/', pessoasService.listarPessoas);

router.get('/:id', pessoasController.obterPessoa);
router.post('/', pessoasController.criarPessoa);
router.put('/:id', pessoasController.atualizarPessoa);
router.delete('/:id', pessoasController.deletarPessoa);
router.get('/:id/carros', pessoasController.obterCarrosDaPessoa);

module.exports = router;
