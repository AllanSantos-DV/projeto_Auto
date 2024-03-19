const carrosController = require('../controllers/carrosController');

const cadastrarCarros = async (req, res) => {
    res.render('newCarro', { title: ' - Cadastrar Carro' });
}

const cadastrarCarro = async (req, res) => {
    let fotoLink = null;
    if (req.file) {
        fotoLink = req.file.path.replace('public/', '');
    }
    const carro = {
        modelo: req.body.modelo,
        marca: req.body.marca,
        ano: req.body.ano,
        preco: req.body.preco,
        fotoLink: fotoLink
    };
    return carrosController.criarCarro(carro).then(() => res.redirect('/carros'));
}


const listarCarros = async (req, res) => {
    const carros = await carrosController.listarCarros();
    const carrosJson = carros.map(carro => carro.toJSON());
    res.render('indexCarro', { title: ' - Listar Carros', carros: carrosJson });
}

const listarCarro = async (req, res) => {
    const carro = await carrosController.obterCarro(req.params.id);
    res.render('carro', { title: ` - ${carro.modelo}`, carro });
}

const obterCarro = async (id) => {
    return await carrosController.obterCarro(id);
}

const atualizarCarro = async (req, res) => {
    const dataAtualizada = {
        modelo: req.body.modelo,
        marca: req.body.marca,
        ano: req.body.ano,
        pessoaId: req.body.pessoaId
    };
    return carrosController.atualizarCarro({ params: { id: req.params.id }, body: dataAtualizada }).then(() => res.redirect('/carros'));
};

const deletarCarro = async (req, res) => {
    return carrosController.deletarCarro(req.params.id).then(() => res.redirect('/carros'));
};

const desassociarCarro = async (req, res) => {
    const carrosIds = req.body.carros;
    return carrosController.desassociarCarro(carrosIds).then(() => res.redirect('/pessoas'));
}

const associarCarro = async (req, res) => {
    const pessoaId = req.params.id;
    const carrosIds = req.body.carros;
    return carrosController.associarCarro(pessoaId, carrosIds).then(() => res.redirect('/pessoas'));
}

module.exports = {
    listarCarros,
    listarCarro,
    obterCarro,
    atualizarCarro,
    cadastrarCarro,
    cadastrarCarros,
    deletarCarro,
    desassociarCarro,
    associarCarro
}