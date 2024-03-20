const Pessoa = require('../database/models/pessoas');

const criarPessoa = async (pessoa) => {
    return await Pessoa.create(pessoa);
};

const listarPessoas = async () => {
    return await Pessoa.findAll({
        include: 'carros'
    });
};

const atualizarPessoa = async (req) => {
    const id = req.params.id;
    return await Pessoa.update(req.body, {
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
    listarPessoas,
    atualizarPessoa,
    deletarPessoa
};
