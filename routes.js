const express = require('express');
const route = express.Router();

const homeController = require('./src/controllers/homeControllers');
const loginController = require('./src/controllers/loginController');

//Tudo o que estiver na raíz da rota, é aconselhável colocar o nome de index
//Rotas da home
route.get('/', homeController.index);

//Rotas de login
route.get('/login/index', loginController.index);
route.post('/login/register', loginController.register);

module.exports = route;