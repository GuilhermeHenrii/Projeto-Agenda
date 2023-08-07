import 'core-js/stable';
import 'regenerator-runtime/runtime';

//validando o frontend
import Login from './modules/Login';
const cadastro = new Login('.cadastro-form');
const login = new Login('.login-form');
cadastro.init();
login.init();