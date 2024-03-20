const express = require('express');
const multer = require('multer');
const path = require('path');
const uuid = require('uuid');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/imagens/carro/');
    },
    filename: function(req, file, cb) {
        let ext = path.extname(file.originalname);
        cb(null, uuid.v4() + ext);
    }
});

const upload = multer({ storage: storage });

// Importar controladores
const carrosController = require('../controllers/carrosController');

// Importar services
const carrosService = require('../services/carrosService');


// Criar roteador
const router = express.Router();

// Definir rotas

// --- Rotas Render
router.get('/novo', carrosService.cadastrarCarros);
router.get('/', carrosService.listarCarros);

// --- Rotas API
router.post('/novo', upload.single('fotoLink'), carrosService.cadastrarCarro);
router.post('/update/:id', upload.single('fotoLink'), carrosService.atualizarCarro);
router.post('/delete/:id', carrosService.deletarCarro);
router.post('/associarCarro/:id', carrosService.associarCarro);
router.post('/dessasociarCarro/:id', carrosService.desassociarCarro);

module.exports = router;
