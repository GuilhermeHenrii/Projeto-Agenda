const express = require('express');
const route = express.Router();

const homeController = require('./src/controllers/homeControllers');
const loginController = require('./src/controllers/loginController');

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

module.exports = route;