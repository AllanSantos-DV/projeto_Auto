const Pessoa = require('../database/models/pessoas');

const listarPessoas = async () => {
    return await Pessoa.findAll({
        include: 'carros'
    });
};

const obterPessoa = async (req) => {
    return await Pessoa.findByPk(req.params.id);
};

const criarPessoa = async (pessoa) => {
    return await Pessoa.create(pessoa);
};

const atualizarPessoa = async (req) => {
    const id = req.params.id;
    dessasociarCarro(id);
    return await Pessoa.update(req.body, {
        where: { id }
    });
};

const dessasociarCarro = async (id) => {
    return await Pessoa.update({ carroId: null }, {
        where: { id }
    });
};

const deletarPessoa = async (id) => {
    return await Pessoa.destroy({
        where: { id }
    });
};

const obterCarrosDaPessoa = async (id) => {
    return await Pessoa.findByPk(id, { include: ['carros'] });
};

module.exports = {
    listarPessoas,
    obterPessoa,
    criarPessoa,
    atualizarPessoa,
    deletarPessoa,
    obterCarrosDaPessoa
};
