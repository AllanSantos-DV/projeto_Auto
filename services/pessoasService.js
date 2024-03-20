const pessoasController = require('../controllers/pessoasController');
const carrosController = require('../controllers/carrosController');

const carrosDisponiveisJson = async () => {
    carros = await carrosController.listarCarrosNaoAssociados();
    return carros.map(carro => carro.toJSON());
};

//renderiza a página de cadastro de pessoas e listagem de pessoas
const cadastrarPessoas = async (req, res) => {
    res.render('newPessoa', { title: ' - Cadastrar Pessoa', carros : await carrosDisponiveisJson()});
};

const listarPessoas = async (req, res) => {
    const pessoas = await pessoasController.listarPessoas();
    const pessoasJson = await Promise.all(pessoas.map(async pessoa => {
        const pessoaJson = pessoa.toJSON();
        pessoaJson.carrosDisponiveis = await carrosDisponiveisJson();
        return pessoaJson;
    }));
    res.render('index', { title: ' - Listar Pessoas', pessoas: pessoasJson});
};

// services para API
const cadastrarPessoa = async (req, res) => {
    const pessoa = {
        nome: req.body.nome,
        idade: req.body.idade,
    };
    const novaPessoa = await pessoasController.criarPessoa(pessoa);
    
    if (req.body.carros) {
        novaPessoa.setCarros(req.body.carros);
    }
    res.redirect('/pessoas');
};

const atualizarPessoa = async (req, res) => {
    const dataAtualizada = {
        nome: req.body.nome,
        idade: req.body.idade,
        carros: req.body.carros
    };
    return pessoasController.atualizarPessoa({ params: { id: req.params.id }, body: dataAtualizada }).then(() => res.redirect('/pessoas'));
};

const deletarPessoa = async (req, res) => {
    return pessoasController.deletarPessoa(req.params.id).then(() => res.redirect('/pessoas'));
};

module.exports = {
    cadastrarPessoas,
    listarPessoas,
    cadastrarPessoa,
    atualizarPessoa,
    deletarPessoa
}
