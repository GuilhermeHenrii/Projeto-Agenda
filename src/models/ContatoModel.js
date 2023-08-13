const mongoose = require('mongoose');
const { async } = require('regenerator-runtime');
const validator = require('validator');

//setando o schema de contato no db
const ContatoSchema = new mongoose.Schema({
    nome: {type: String, required: true},
    sobrenome: {type: String, required: false, default: ''},
    email: {type: String, required: false, default: ''},
    telefone: {type: Number, required: false, default: ''},
    
    //vai pegar automaticamente a hora quando um contato foi criado.
    criadoEm: {type: Date, default: Date.now},
    idUser: {type: String, required: false}
});

//criação do model
const ContatoModel = mongoose.model('Contato', ContatoSchema)

//Aqui iremos usar constructor function para criar o model
function Contato(body){
    this.body = body;
    this.errors = [];
    this.contato = null;
    this.valid = true;
}

Contato.prototype.register = async function(){
    this.valida();

    if(this.errors.length > 0){
        return;
    }

    this.contato = await ContatoModel.create(this.body);
    // this.contato.idUser 
}

Contato.prototype.valida = function (){
    this.cleanUp();
    //Validação
    //O email precisa ser válido
    if(this.body.email && !validator.isEmail(this.body.email)) this.errors.push('E-mail inválido');
    if(!this.body.nome) this.errors.push('Nome é um campo obrigatório');
    if(!this.body.email && !this.body.telefone) {
        this.errors.push('Insira um email ou telefone ao contato');
    }
}

Contato.prototype.cleanUp = function(){
    //Função que verifica se o 'value' dos inputs, ou seja, os valores do body são strings.
    //Se não for, será uma string vazia.
    for(let key in this.body){
        if(typeof this.body[key] != 'string'){
            this.body[key] = '';
        }
    }

    //Setei meu objeto body para que ele não venha junto com o csrfToken.
    this.body = {
        nome: this.body.nome,
        sobrenome: this.body.sobrenome,
        email: this.body.email,
        telefone: this.body.telefone
    }
}

//método que irá pegar o id do contato, validar e vai atualizar seus dados
Contato.prototype.edit = async function(id){
    if(typeof id !== 'string') return;
    this.valida();
    if(this.errors.length > 0 ) {
        this.contato = await ContatoModel.findById(id);
        return this.contato.id;
    };
    this.contato = await ContatoModel.findByIdAndUpdate(id, this.body, {new: true});
    console.log(this.contato);
}

//um metodo estatico
Contato.buscaPorId = async function(id){
    if(typeof id !== 'string') return;
    const contato = await ContatoModel.findById(id);
    return contato;
}

//método estático que retorna todos os contatos e ordenando pela propriedade criadoEm, em ordem decrescente.
//{idUser}
ContatoModel.buscaContatos = async function(id){
    const contatos = await this.find({idUser: id})
        .sort({criadoEm: -1});

    return contatos;
}

//metodo que deleta o contato 
Contato.delete = async function(id){
    if(typeof id !== 'string') return;
    const contato = await ContatoModel.findByIdAndDelete(id);
    console.log(contato);
    return contato;
}

const model = mongoose.model('Contato', ContatoSchema);

module.exports = {Contato, model};
