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

const listarCarros = async () => {
    return await Carro.findAll();
};

const listarCarrosNaoAssociados = async () => {
    return await Carro.findAll({
        where: { pessoaId: null }
    });
};

const obterCarro = async (id) => {
    return await Carro.findByPk(id);
};

const criarCarro = async (carro) => {
    return await Carro.create(carro);
};

const atualizarCarro = async (req) => {
    return await Carro.update(req.body, {
        where: { id: req.params.id }
    });
};

const deletarCarro = async (id) => {
    return await Carro.destroy({
        where: { id }
    });
}

const obterPessoaDoCarro = async (id) => {
    return await Carro.findByPk(id, { include: ['pessoa'] });
};

module.exports = {
    listarCarros,
    listarCarrosNaoAssociados,
    obterCarro,
    criarCarro,
    atualizarCarro,
    deletarCarro,
    obterPessoaDoCarro,
    upload
};
