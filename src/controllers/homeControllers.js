const {Contato, model} = require('../models/ContatoModel');

exports.index = async (req, res) => {
    //se tiver um usuario logado, buscara tds os contados cadatrados pelo mesmo. Busca feita pelo idUser, que é uma chave que foi criada para receber o valor do id do usuário logado.
    if(req.session.user){
        const contatos = await model.buscaContatos(req.session.user._id);
        res.render('index', {contatos});
    }else{
        //se n tiver usuario logado, passa contato como um objeto vazio
        const contatos = {};
        res.render('index', {contatos});
    }
    
    
};