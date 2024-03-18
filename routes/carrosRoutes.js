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
router.get('/', carrosService.listarCarros);
router.get('/novo', carrosService.cadastrarCarros);

// --- Rotas API
router.post('/novo', upload.single('fotoLink'), carrosService.cadastrarCarro);
router.post('/dessasociarCarro/:id', carrosService.desassociarCarro);
router.post('/associarCarro/:id', carrosService.associarCarro);

//router.post('/update/:id', carrosController.atualizarCarro);
//router.post('/delete/:id', carrosController.deletarCarro);
//router.post('/upload/:id', upload.single('imagem'), carrosController.uploadImagem);

module.exports = router;
