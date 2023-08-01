// Para fazer com que o LoginModel tenha acesso ao body da minha requisição, eu o importei e instanciei um objeto (login) na classe Login do Model.
const Login = require('../models/LoginModel');

exports.index = (req, res) => {
    if(req.session.user){
        //aq ocorrera um erro pois tem duas chamadas res na mesma rota
        res.render('usuario-logado');
    }

    //debudando a sessão do usuario para checar se realmente tem alguem logado.
    console.log(req.session.user);
    return res.render('login');
};


//Como a nossa função de registrar usuário é uma função assincrona, temos que declarar a função que a executa também como assincrona e declarar também que, essa arrow function deve esperar que a função login.register execute para dar continuidade ao código.

exports.register = async (req, res) => {
    try{
        const login = new Login(req.body);
        await login.register();
 
        if(login.errors.length > 0){
            //chamando as flashMensages de erro
            req.flash('errors', login.errors);
            //salvando a sessão
            //retornando para a pagina de login
            req.session.save(function() {
                return res.redirect('/login/index');
        });
        return;
    }

    //chamando as flashMensages de sucesso
    req.flash('success', 'Usuário criado com sucesso!');
    req.session.save(function() {
        return res.redirect('/login/index');  
    });

    }catch(e){
        console.log(e);
        return res.render('error');
    }
    
};


//exportando nosso metódo que irá lidar com o post do formulario de login
//Será um método bem parecido com o do register
exports.login = async function (req, res){
    try{
        const login = new Login(req.body);
        //chamando o metodo login do model
        await login.login();

        if(login.errors.length > 0){
            req.flash('errors', login.errors);
            req.session.save(function(){
                return res.redirect('/login/index');
            });
            return;
        }

        req.flash('success', 'Login efetuado com sucesso.');
        req.session.user = login.user;
        req.session.save(function(){
            return res.redirect('/login/index');
        });
    }catch(e){
        console.log(e);
        return res.render('error');
    }
}


exports.logout = function(req, res){
    req.session.destroy();
    res.redirect('/');
}