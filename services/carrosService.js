const carrosController = require('../controllers/carrosController');
const tryCatchWrapper = require('./tryCatch');
const fs = require('fs');

// Renderizar página de cadastro de carros
const cadastrarCarros = async (req, res) => {
    res.render('newCarro', { title: ' - Cadastrar Carro' });
};

const listarCarros = async (req, res) => {
    const carros = await carrosController.listarCarros();
    const carrosJson = carros.map(carro => carro.toJSON());
    res.render('indexCarro', { title: ' - Listar Carros', carros: carrosJson });
};

const obterCarro = async (req, res) => {
    const carro = await carrosController.obterCarro(req.params.id);
    const carroJson = carro.toJSON();
    res.render('carro', { title: ' - Detalhes do Carro', carro: [carroJson] });
};

const deletarImagem = async (id) => {
    const file = await carrosController.obterCarro(id).then(carro => carro.fotoLink);
    if (file) {
        fs.unlinkSync(`public/${file}`);
    }
};

const cadastrarCarro = async (req, res) => {
    const carro = req.body;
    if (req.file) carro.fotoLink = req.file.path.replace('public\\', '');
    await tryCatchWrapper(async () => {
        await carrosController.criarCarro(carro);
    },
        'Carro cadastrado com sucesso',
        'Erro ao cadastrar carro',
        req
    );
    res.redirect('/carros');
};

const atualizarCarro = async (req, res) => {
    const id = req.params.id;
    const carroAtual = req.body;
    if (req.file) {
        await deletarImagem(id);
        carroAtual.fotoLink = req.file.path.replace('public\\', '');
    }
    await tryCatchWrapper(async () => {
        await carrosController.atualizarCarro(id, carroAtual);
    },
        'Carro atualizado com sucesso',
        'Erro ao atualizar carro',
        req
    );
    res.redirect('/carros');
};

const deletarCarro = async (req, res) => {
    await deletarImagem(req.params.id);
    await tryCatchWrapper(async () => {
        await carrosController.deletarCarro(req.params.id);
    },
        'Carro deletado com sucesso',
        'Erro ao deletar carro',
        req
    );
    res.redirect('/carros');
};

module.exports = {
    cadastrarCarros,
    listarCarros,
    obterCarro,
    cadastrarCarro,
    atualizarCarro,
    deletarCarro
}
