const { async } = require('regenerator-runtime');
const Contato = require('../models/ContatoModel')

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
    await contato.register();

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