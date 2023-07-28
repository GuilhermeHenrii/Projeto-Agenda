// Para fazer com que o LoginModel tenha acesso ao body da minha requisição, eu o importei e instanciei um objeto na classe Login do Model.
const Login = require('../models/LoginModel');

exports.index = (req, res) => {
    res.render('login');
};


//Como a nossa função de registrar usuário é uma função assincrona, temos que declarar a função que a executa também como assincrona e declarar também que, essa arrow function deve esperar que a função login.register execute para dar continuidade ao código.

exports.register = async (req, res) => {
    try{
        const login = new Login(req.body);
        await login.register();

        if(login.errors.length > 0){
            req.flash('errors', login.errors);
            req.session.save(function() {
                return res.redirect('/login/index');
        });
        return;
    }

    req.flash('success', 'Usuário criado com sucesso!');
    req.session.save(function() {
        return res.redirect('/login/index');
    });

    }catch(e){
        console.log(e);
        return res.render('error');
    }
    
};