const fs = require('fs');
const path = require('path');
const multer = require('multer');
const Carro = require('../database/models/carros');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './imagens/carro/');
    },
    filename: function(req, file, cb) {
        cb(null, `${req.params.id}.jpg`);
    }
});

const upload = multer({ storage: storage });

const listarCarros = async (req, res) => {
    const carros = await Carro.findAll();
    res.json(carros);
};

const obterCarro = async (req, res) => {
    const carro = await Carro.findByPk(req.params.id);
    if (carro) {
        res.json(carro);
    } else {
        res.status(404).send('Carro não encontrado');
    }
};

const criarCarro = async (req, res) => {
    const carroData = {
        ...req.body,
        fotoLink: req.file ? `/imagens/carro/${req.file.filename}` : null
    };
    const novoCarro = await Carro.create(carroData);
    res.status(201).json(novoCarro);
};

const atualizarCarro = async (req, res) => {
    const carro = await Carro.findByPk(req.params.id);
    if (!carro) {
        return res.status(404).send('Carro não encontrado');
    }

    // Se uma nova foto foi enviada, exclua a antiga
    if (req.file && carro.fotoLink) {
        fs.unlinkSync(path.join(__dirname, '/imagens/carro/', carro.fotoLink));
    }

    const carroData = {
        ...req.body,
        fotoLink: req.file ? `/imagens/carro/${req.file.filename}` : carro.fotoLink
    };

    const atualizaCarro = await Carro.update(carroData, {
        where: { id: req.params.id }
    });

    res.json(atualizaCarro);
};

const deletarCarro = async (req, res) => {
    const carro = await Carro.findByPk(req.params.id);
    if (!carro) {
        return res.status(404).send('Carro não encontrado');
    }

    // Exclua a foto do carro
    if (carro.fotoLink) {
        fs.unlinkSync(path.join(__dirname, '/imagens/carro/', carro.fotoLink));
    }

    const deletaCarro = await Carro.destroy({
        where: { id: req.params.id }
    });

    res.status(204).send('Carro deletado');
};

const obterPessoaDoCarro = async (req, res) => {
    const carro = await Carro.findByPk(req.params.id, { include: ['pessoa'] });
    if (carro) {
        res.json(carro.pessoa);
    } else {
        res.status(404).send('Carro não encontrado');
    }
};

module.exports = {
    listarCarros,
    obterCarro,
    criarCarro,
    atualizarCarro,
    deletarCarro,
    obterPessoaDoCarro,
    upload
};
