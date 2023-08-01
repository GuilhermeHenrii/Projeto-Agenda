exports.middlewareGlobal = (req, res, next) => {
    //Usando o midlleware global para criar a variavel errors/success para ser acessada no arquivo ejs.
    res.locals.errors = req.flash('errors');
    res.locals.success = req.flash('success');
    //adicionando a variavel user ao objeto locals. Fazendo com que ela fique acessivel no ejs.
    res.locals.user = req.session.user;
    next();
}

//configurando os middlewares do csrfToken
exports.checkErrorCsrf = (err, req, res, next) => {
    if(err){
        return res.render('error');
    }

    next();
}

exports.csfrMiddleware = (req, res, next) =>{
    res.locals.csrfToken = req.csrfToken();
    next();
}