const fs = require('fs');
const carrosController = require('../controllers/carrosController');

// renderiza a página de cadastro de carros e listagem de carros
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
    res.render('carro', { title: ' - Detalhes do Carro', carro: [carroJson]});
};

// Deleta imagem do carro

const deletarImagem = async (id) => {
    const file = await carrosController.obterCarro(id).then(carro => carro.fotoLink);
    if(file) {
        fs.unlinkSync(`public/${file}`);
    }
}

// services para API
const cadastrarCarro = async (req, res) => {
    const carro = req.body;
    if(req.file) {
        carro.fotoLink = req.file.path.replace('public\\', '');
    }
    return carrosController.criarCarro(carro).then(() => res.redirect('/carros'));
};

const atualizarCarro = async (req, res) => {
    const id = req.params.id;
    const carroAtual = req.body;
    if(req.file) {
        await deletarImagem(id);
        carroAtual.fotoLink = req.file.path.replace('public\\', '');
    }
    return carrosController.atualizarCarro(id, carroAtual).then(() => res.redirect('/carros'));
};

const deletarCarro = async (req, res) => {
    await deletarImagem(req.params.id);
    return carrosController.deletarCarro(req.params.id).then(() => res.redirect('/carros'));
};

const associarCarro = async (req, res) => {
    const pessoaId = req.params.id;
    const carrosIds = req.body.carros;
    return carrosController.associarCarro(pessoaId, carrosIds).then(() => res.redirect('/pessoas'));
};

const desassociarCarro = async (req, res) => {
    const carrosIds = req.body.carros;
    return carrosController.desassociarCarro(carrosIds).then(() => res.redirect('/pessoas'));
};

module.exports = {
    cadastrarCarros,
    listarCarros,
    obterCarro,
    cadastrarCarro,
    atualizarCarro,
    deletarCarro,
    associarCarro,
    desassociarCarro
}
