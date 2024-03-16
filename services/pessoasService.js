const pessoasController = require('../controllers/pessoasController');

const cadastrarPessoas = async (req, res) => {
    res.render('novo', { title: ' - Cadastrar Pessoa' });
}

const cadastrarPessoa = async (req, res) => {
    const pessoa = {
        nome: req.body.nome,
        idade: req.body.idade,
    };
    return pessoasController.criarPessoa(pessoa);
}

const listarPessoas = async (req, res) => {
    const pessoas = await pessoasController.listarPessoas();
    res.render('index', { title: ' - Listar Pessoas', pessoas });
}

const listarPessoa = async (req, res) => {
    const pessoa = await pessoasController.listarPessoa(req.params.id);
    res.render('pessoa', { title: ` - ${pessoa.nome}`, pessoa });
}

const atualizarPessoa = async (req, res) => {
    const dataAtualizada = {
        nome: req.body.nome,
        idade: req.body.idade,
    };

    return pessoasController.atualizarPessoa({ params: { id: req.params.id }, body: dataAtualizada });
};

module.exports = {
    listarPessoas,
    listarPessoa,
    atualizarPessoa,
    cadastrarPessoa,
    cadastrarPessoas
}
