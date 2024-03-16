const Pessoa = require('../database/models/pessoas');

const listarPessoas = async () => {
    return await Pessoa.findAll();
};

const obterPessoa = async (req) => {
    return await Pessoa.findByPk(req.params.id);
};

const criarPessoa = async (req) => {
    return await Pessoa.create(req.body);
};

const atualizarPessoa = async (req) => {
    return await Pessoa.update(req.body, {
        where: { id: req.params.id }
    });
};

const deletarPessoa = async (req) => {
    return await Pessoa.destroy({
        where: { id: req.params.id }
    });
};

const obterCarrosDaPessoa = async (req) => {
    return await Pessoa.findByPk(req.params.id, { include: ['carros'] });
};

module.exports = {
    listarPessoas,
    obterPessoa,
    criarPessoa,
    atualizarPessoa,
    deletarPessoa,
    obterCarrosDaPessoa
};
