const Carro = require('../database/models/carros');

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

const desassociarCarro = async (carrosIds) => {
    return await Carro.update({ pessoaId : null }, {
        where: { id: carrosIds }
    });
};

const associarCarro = async (pessoaId, carrosIds) => {
    return await Carro.update({ pessoaId }, {
        where: { id: carrosIds }
    });
}

module.exports = {
    listarCarros,
    listarCarrosNaoAssociados,
    obterCarro,
    criarCarro,
    atualizarCarro,
    deletarCarro,
    obterPessoaDoCarro,
    desassociarCarro,
    associarCarro
};
