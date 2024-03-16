const express = require('express');

// Importar controladores
const carrosController = require('../controllers/carrosController');

// Importar upload
const upload = carrosController.upload;

// Criar roteador
const router = express.Router();

// Definir rotas
/*
router.get('/', carrosController.listarCarros);
router.get('/:id', carrosController.obterCarro);
router.post('/', upload.single('foto'), carrosController.criarCarro);
router.put('/:id', upload.single('foto'), carrosController.atualizarCarro);
router.delete('/:id', carrosController.deletarCarro);
router.get('/:id/pessoa', carrosController.obterPessoaDoCarro);
*/

module.exports = router;
