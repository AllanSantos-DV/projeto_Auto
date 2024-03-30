const pessoasController = require('../controllers/pessoasController');
const carrosController = require('../controllers/carrosController');
const tryCatchWrapper = require('./tryCatch');

const carrosDisponiveisJson = async () => {
    let carros = await carrosController.listarCarrosNaoAssociados();
    return carros.map(carro => carro.toJSON());
};

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
    let mensagemCarros = await atualizarCarroDaPessoa(id, req);
    await tryCatchWrapper(async () => {
        await pessoasController.atualizarPessoa(id, pessoa);
    },
        'Pessoa atualizada com sucesso',
        'Erro ao atualizar pessoa',
        req
    );
    req.flash('success', mensagemCarros);
    res.redirect('/pessoas');
}

const atualizarCarroDaPessoa = async (id, req) => {
    let mensagem = '';
    await tryCatchWrapper(async () => {
        if (req.body.carrosDisponiveis) {
            await pessoasController.obterPessoa(id).then(pessoa => pessoa.addCarros(req.body.carrosDisponiveis));
            mensagem = ' Carro(s) adicionado(s) com sucesso';
        }
        if (req.body.carros) {
            await pessoasController.obterPessoa(id).then(pessoa => pessoa.removeCarros(req.body.carros));
            mensagem = mensagem === '' ? ' Carro(s) removido(s) com sucesso' : ' Carro(s) adicionado(s) e removido(s) com sucesso';
        }
    },
        mensagem,
        'Erro ao atualizar carros da pessoa',
        req
    );
    return mensagem;
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
