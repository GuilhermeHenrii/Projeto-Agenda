const { async } = require('regenerator-runtime');
const {Contato, model} = require('../models/ContatoModel');

exports.index = function (req, res){
    res.render('contato', {
        //limpando o objeto contato, para quando essa rota for chamada dnv, n vir com as informações do ultimo contato salvo
        contato:{}
    });    
}

//a logica desse controller vai ser bem parecida com a do login
exports.register = async (req, res) =>{
    try{
    const contato = new Contato(req.body);
    //ta dando erro aqui, contato.register is not a function
    await contato.register();

    //criamos uma chave idUser e colocamos ela como nao requerida, apos isso atribuimos seu valor ao id do usuario e salvamos isso no banco de dados. Agr todo contato salvo tera o id do usuario que o salvou.
    contato.contato.idUser = res.locals.user._id;
    await contato.contato.save();
   
    console.log(contato.contato.idUser);

    if(contato.errors.length > 0){
        req.flash('errors', contato.errors);
        req.session.save(() => res.redirect('/contato/index'));
        return;
    }

    req.flash('success', 'Contato registrado com sucesso');
    req.session.save(() => res.redirect(`/contato/index/${contato.contato._id}`));//aqui estamos acessando a classe contato, dentro dela a constante contato que tera o valor do body da requisição, por fim estamos acessando o id desse body.
    return;
    }catch(e){
        console.log(e);
        res.render('error');
    }
    
}

exports.editIndex = async function (req, res) {
    if(!req.params.id) return res.render('error');
    const contato = await Contato.buscaPorId(req.params.id);
    if(!contato){
        return res.render('error');
    }
    //renderizando o ejs contato passando o objeto contato da model, objeto esse limpo
    res.render('contato', { contato });
}

exports.edit = async function(req, res) {
    try{
        if(!req.params.id) return res.render('error');
        const contato = new Contato(req.body);
        await contato.edit(req.params.id);
        contato.contato.idUser = res.locals.user._id;
        await contato.contato.save();

        if(contato.errors.length > 0){
            req.flash('errors', contato.errors);
            req.session.save(() => res.redirect(`/contato/index/${contato.contato._id}`));
            return;
        }
    
        req.flash('success', 'Contato editado com sucesso');
        req.session.save(() => res.redirect(`/contato/index/${contato.contato._id}`));       
    }catch(e){
        console.log(e);
        res.render('error');
    }
}

//middleware que trata a rota delete do contato
exports.delete = async function(req, res){
    if(!req.params.id) return res.render('error');

    const deletaContato = await Contato.delete(req.params.id); 
    if(!deletaContato) return res.render('error');

    req.flash('success', 'Contato apagado com sucesso.');
    req.session.save(() => res.redirect('back'));
    return;
}