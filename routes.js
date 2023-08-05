const express = require('express');
const route = express.Router();

const homeController = require('./src/controllers/homeControllers');
const loginController = require('./src/controllers/loginController');
const contatoController = require('./src/controllers/contatoController');

//importando o middleware para ser usado antes da rota que adiciona contatos
const {loginRequired} = require('./src/middlewares/middleware');

//Tudo o que estiver na raíz da rota, é aconselhável colocar o nome de index
//Rotas da home
route.get('/', homeController.index);

//Rotas do index
route.get('/login/index', loginController.index);

//rota do register
route.post('/login/register', loginController.register);

//rota de login
route.post('/login/login', loginController.login);

//rota para desconctar o usuario
route.get('/login/logout', loginController.logout);

//rota para cadastrar novos usuarios
//Usando o Get pois estamos requerindo uma pagina e nao postando algo
route.get('/contato/index', loginRequired, contatoController.index);
route.post('/contato/register', loginRequired, contatoController.register);
//quando eu registro um
route.get('/contato/index/:id', loginRequired, contatoController.editIndex);

//rota que vai tratar o update do formulario enviado com os dados do contato salvo
route.post('/contato/edit/:id', loginRequired, contatoController.edit);

//rota que vai tratar o delete dos contatos
route.get('/contato/delete/:id', loginRequired, contatoController.delete);

module.exports = route;