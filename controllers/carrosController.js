const Carro = require('../database/models/carros');

const criarCarro = async (carro) => {
    return await Carro.create(carro);
};

const listarCarros = async () => {
    return await Carro.findAll();
};

const listarCarrosNaoAssociados = async () => {
    return await Carro.findAll({
        where: { pessoaId: null }
    });
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

const associarCarro = async (pessoaId, carrosIds) => {
    return await Carro.update({ pessoaId }, {
        where: { id: carrosIds }
    });
};

const desassociarCarro = async (carrosIds) => {
    return await Carro.update({ pessoaId : null }, {
        where: { id: carrosIds }
    });
};

module.exports = {
    criarCarro,
    listarCarros,
    listarCarrosNaoAssociados,
    atualizarCarro,
    deletarCarro,
    obterPessoaDoCarro,
    associarCarro,
    desassociarCarro
};
