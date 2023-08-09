import 'core-js/stable';
import 'regenerator-runtime/runtime';

//validando o frontend
import Login from './modules/Login';
import Cadastro from './modules/cadastro';

const cadastro = new Login('.cadastro-form');
const login = new Login('.login-form');
cadastro.init();
login.init();


const editaContato = new Cadastro('.edit-form');
const cadastraContato = new Cadastro('.register-form');
editaContato.init();
cadastraContato.init();


console.log('oiii');