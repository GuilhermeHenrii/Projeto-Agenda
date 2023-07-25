exports.middlewareGlobal = (req, res, next) => {
    //Caso queiramos renderizar algo na tela em todas as rotas, podemos usar um middleware global, como é o caso deste.
    //Podendo ser qualquer coisa.
    res.locals.umavariavelLocal = 'Uma variavel local';
    next();
}

//configurando os middlewares do csrfToken
exports.checkErrorCsrf = (err, req, res, next) => {
    if(err && 'EBADCSRFTOKEN' === err.code){
        return res.render('error');
    }
}


exports.csfrMiddleware = (req, res, next) =>{
    res.locals.csrfToken = req.csrfToken();
    next();
}