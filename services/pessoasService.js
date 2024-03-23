const pessoasController = require('../controllers/pessoasController');
const carrosController = require('../controllers/carrosController');
const tryCatchWrapper = require('./tryCatch');

const carrosDisponiveisJson = async () => {
    carros = await carrosController.listarCarrosNaoAssociados();
    return carros.map(carro => carro.toJSON());
};

//renderiza a página de cadastro de pessoas e listagem de pessoas
const cadastrarPessoas = async (req, res) => {
    res.render('newPessoa', { title: ' - Cadastrar Pessoa', carros: await carrosDisponiveisJson() });
};

const listarPessoas = async (req, res) => {
    const pessoas = await pessoasController.listarPessoas();
    const pessoasJson = await Promise.all(pessoas.map(async pessoa => {
        const pessoaJson = pessoa.toJSON();
        pessoaJson.carrosDisponiveis = await carrosDisponiveisJson();
        return pessoaJson;
    }));
    res.render('index', { title: ' - Listar Pessoas', pessoas: pessoasJson });
};

// services para API
const cadastrarPessoa = async (req, res) => {
    const pessoa = req.body;
    await tryCatchWrapper(async () => {
        await pessoasController.criarPessoa(pessoa).then(pessoaCriada => {
            if (req.body.carros) {
                pessoaCriada.setCarros(req.body.carros);
            }
        });
    },
        'Pessoa cadastrada com sucesso',
        'Erro ao cadastrar pessoa',
        req
    );
    res.redirect('/pessoas');
};

const atualizarPessoa = async (req, res) => {
    const id = req.params.id;
    const pessoa = {
        nome: req.body.nome,
        idade: req.body.idade,
    };
    console.log(req.body);
    await atualizarCarroDaPessoa(id, req);
    await tryCatchWrapper(async () => {
        await pessoasController.atualizarPessoa(id, pessoa);
    },
        'Pessoa atualizada com sucesso',
        'Erro ao atualizar pessoa',
        req
    );
    res.redirect('/pessoas');
}

const atualizarCarroDaPessoa = async (id, req) => {
    if (req.body.carrosDisponiveis) {
        await pessoasController.obterPessoa(id).then(pessoa => pessoa.addCarros(req.body.carrosDisponiveis));
    }
    if (req.body.carros) {
        await pessoasController.obterPessoa(id).then(pessoa => pessoa.removeCarros(req.body.carros));
    }
};

const deletarPessoa = async (req, res) => {
    await tryCatchWrapper(async () => {
        await pessoasController.deletarPessoa(req.params.id);
    },
        'Pessoa deletada com sucesso',
        'Erro ao deletar pessoa',
        req
    );
    res.redirect('/pessoas');
};

module.exports = {
    cadastrarPessoas,
    listarPessoas,
    cadastrarPessoa,
    atualizarPessoa,
    deletarPessoa
}
