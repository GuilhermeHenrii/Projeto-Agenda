const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeControllers');
const contatsController = require('./src/controllers/contactsControllers');

//Temos que usar o next como parametro e depois no final da função chamar o next e o executar, a fim de fazer com que o proximo middleware seja executado
function meuMiddleware(req, res, next){
    req.session = {nome:'Guilherme', sobrenome:'Henrique'};
    console.log();
    console.log('Acessei no seu middleware');
    console.log();
    next();
}

//Rotas da home
route.get('/', /*meuMiddleware*/ homeController.homePage, function outroMiddleware(req, res){
    console.log();
    console.log(`Ultimo middleware: req.session.nome: ${req.session.sobrenome}`);
    console.log();
});
route.post('/', homeController.trataPost);

//Rotas de contato
route.get('/contatos', contatsController.contacts);
route.post('/contatos', contatsController.sendContacts);

module.exports = route;