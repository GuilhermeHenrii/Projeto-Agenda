const Contato = require('../models/ContatoModel');

exports.index = async (req, res) => {
    //pesquisando todos os contatos registrados no db e injetando-os no arquivo ejs
    const contatos = await Contato.buscaContatos();
    res.render('index', {contatos});
};