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

// modelo de carro
const carro = async (req) => {
    const carro = {
        modelo: req.body.modelo,
        marca: req.body.marca,
        ano: req.body.ano,
        preco: req.body.preco,
        fotoLink: req.file ? req.file.path.replace('public\\', '') : null
    };
    return carro;
};

// services para API
const cadastrarCarro = async (req, res) => {
    const carro = await carro(req);
    return carrosController.criarCarro(carro).then(() => res.redirect('/carros'));
};

const atualizarCarro = async (req, res) => {
    const dataAtualizada = await carro(req);
    return carrosController.atualizarCarro({ params: { id: req.params.id }, body: dataAtualizada }).then(() => res.redirect('/carros'));
};

const deletarCarro = async (req, res) => {
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
    cadastrarCarro,
    atualizarCarro,
    deletarCarro,
    associarCarro,
    desassociarCarro
}
