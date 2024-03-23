const Pessoa = require('../database/models/pessoas');

const criarPessoa = async (pessoa) => {
    return await Pessoa.create(pessoa);
};

const obterPessoa = async (id) => {
    return await Pessoa.findByPk(id);
};

const listarPessoas = async () => {
    return await Pessoa.findAll({
        include: 'carros'
    });
};

const atualizarPessoa = async (id, pessoa) => {
    return await Pessoa.update(pessoa, {
        where: { id }
    });
};

const deletarPessoa = async (id) => {
    return await Pessoa.destroy({
        where: { id }
    });
};

module.exports = {
    criarPessoa,
    obterPessoa,
    listarPessoas,
    atualizarPessoa,
    deletarPessoa
};
