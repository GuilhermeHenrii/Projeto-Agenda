const { create } = require('connect-mongo');
const mongoose = require('mongoose');
const validator = require('validator');

const LoginSchema = new mongoose.Schema({
    //Configurei o schema para email e senha, ambos do tipo string e requeridos.
    email: {type: String, required: true},
    password: {type: String, required: true}
});

const LoginModel = mongoose.model('Login', LoginSchema);

class Login{
    constructor(body){
        this.body = body;
        this.errors = [];
        this.user = null;         
    }

    //Quando fizemos uma operação com banco de dados, necessariamente temos que fazer uma promessa.
    async register(){
        this.valida();
        if(this.errors.length > 0) return;
        //Criando um usuario e colocando sue valor enm this.user, para ficar acessível tanto no model quando no controller.

        //Como estamos tratando de uma de uma promisse, precisamos envolve-la com o try-cath, pq se não teremos uma promessa não resolvida e não saberemos qual o erro que está ocorrendo.
        try{
            this.user = await LoginModel.create(this.body);
        }catch(e){
            console.log(e);
        }
        
    }

    valida(){
        this.cleanUp();
        //Validação
        //O email precisa ser válido
        if(!validator.isEmail(this.body.email)) this.errors.push('E-mail inválido');

        //A senha precisa ter entre 3 e 30 caracteres
        if(this.body.password < 3 || this.body.password > 30){
            this.errors.push('Senha precisa ter entre 3 e 30 caracteres');
        }
    }

    cleanUp(){
        //Função que verifica se o 'value' dos inputs, ou seja, os valores do body são strings.
        //Se não for, será uma string vazia.
        for(let key in this.body){
            if(typeof this.body[key] != 'string'){
                this.body[key] = '';
            }
        }

        //Setei meu objeto body para que ele não venha junto com o csrfToken.
        this.body = {
            email: this.body.email,
            password: this.body.password
        }
    }
}

module.exports = Login;