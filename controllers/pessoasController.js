const Pessoa = require('../database/models/pessoas');

const listarPessoas = async () => {
    return await Pessoa.findAll();
};

const obterPessoa = async (req) => {
    return await Pessoa.findByPk(req.params.id);
};

const criarPessoa = async (pessoa) => {
    return await Pessoa.create(pessoa);
};

const atualizarPessoa = async (req) => {
    return await Pessoa.update(req.body, {
        where: { id: req.params.id }
    });
};

const deletarPessoa = async (id) => {
    return await Pessoa.destroy({
        where: { id }
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
