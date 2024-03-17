const pessoasController = require('../controllers/pessoasController');
const carrosController = require('../controllers/carrosController');

const carrosDisponiveisJson = async () => {
    carros = await carrosController.listarCarrosNaoAssociados();
    return carros.map(carro => carro.toJSON());
}

const cadastrarPessoas = async (req, res) => {
    res.render('newPessoa', { title: ' - Cadastrar Pessoa', carros : await carrosDisponiveisJson()});
}

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
}

const listarPessoas = async (req, res) => {
    const pessoas = await pessoasController.listarPessoas();
    const pessoasJson = await Promise.all(pessoas.map(async pessoa => {
        const pessoaJson = pessoa.toJSON();
        pessoaJson.carrosDisponiveis = await carrosDisponiveisJson();
        return pessoaJson;
    }));
    res.render('index', { title: ' - Listar Pessoas', pessoas: pessoasJson});
}

const listarPessoa = async (req, res) => {
    const pessoa = await pessoasController.listarPessoa(req.params.id);
    res.render('pessoa', { title: ` - ${pessoa.nome}`, pessoa });
}

const atualizarPessoa = async (req, res) => {
    const dataAtualizada = {
        nome: req.body.nome,
        idade: req.body.idade,
        carros: req.body.carros
    };
    return pessoasController.atualizarPessoa({ params: { id: req.params.id }, body: dataAtualizada }).then(() => res.redirect('/pessoas'));
};

const obterCarrosDaPessoa = async (req) => {
    return await pessoasController.obterCarrosDaPessoa(req);
}

const deletarPessoa = async (req, res) => {
    return pessoasController.deletarPessoa(req.params.id).then(() => res.redirect('/pessoas'));
};

module.exports = {
    listarPessoas,
    listarPessoa,
    atualizarPessoa,
    cadastrarPessoa,
    cadastrarPessoas,
    obterCarrosDaPessoa,
    deletarPessoa
}
