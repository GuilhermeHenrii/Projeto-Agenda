exports.homePage = (req, res) => {
    res.render('index', {
        //Ejetando ejs
        // titulo:undefined,
        numeros: [0, 10, 20, 30, 40, 50, 60],
    });
    return;
};

exports.trataPost = (req, res) => {
    res.send(req.body);
    console.log(exports);
};