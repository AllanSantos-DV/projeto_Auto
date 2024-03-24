const express = require('express');
const multer = require('multer');
const path = require('path');
const uuid = require('uuid');
const fs = require('fs');

const dir = './public/imagens/carros';

if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, dir);
    },
    filename: function(req, file, cb) {
        let ext = path.extname(file.originalname);
        cb(null, uuid.v4() + ext);
    }
});

const upload = multer({ storage: storage });

// Importar services
const carrosService = require('../services/carrosService');


// Criar roteador
const router = express.Router();

// Definir rotas

// --- Rotas Render
router.get('/novo', carrosService.cadastrarCarros);
router.get('/', carrosService.listarCarros);
router.get('/:id', carrosService.obterCarro);

// --- Rotas API
router.post('/novo', upload.single('fotoLink'), carrosService.cadastrarCarro);
router.post('/update/:id', upload.single('fotoLink'), carrosService.atualizarCarro);
router.post('/delete/:id', carrosService.deletarCarro);

module.exports = router;
