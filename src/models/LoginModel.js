const { create } = require('connect-mongo');
const mongoose = require('mongoose');
//biblioteca validator para validar os valores dos inputs
const validator = require('validator');
//biblioteca que gera um hash com o valor da senha
const bcryptjs = require('bcryptjs');


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

    async login(){
        //vai validar e retornar o objeto limpo
        this.valida();
        //verificação de erros
        if(this.errors.length > 0) return;

        //fazendo um consulta na banco para ver se existe algum email igual ao passado na requisição
        this.user = await LoginModel.findOne({email: this.body.email});

        //se não existir usuario, erro é lançado
        if(!this.user){
            this.errors.push('Usuário não existe');
            return;
        }

        //se email existir, verifica a senha
        if(!bcryptjs.compareSync(this.body.password, this.user.password)){
            this.errors.push('Senha inválida');
            //setando o valor de this.user em null para manter seu estado apropriado, já que estamos falando de um erro
            this.user = null;
            return;
        }
    }

    //Quando fizemos uma operação com banco de dados, necessariamente temos que fazer uma promessa.
    async register(){
        this.valida();
        if(this.errors.length > 0) return;

        //metodo que verifica se o usuario ja existe no db
        await this.userExists();
        if(this.errors.length > 0) return;

        //usando o bcrypt para criar o hash da senha
        const salt = bcryptjs.genSaltSync();
        this.body.password = bcryptjs.hashSync(this.body.password, salt);



        //Criando um usuario e colocando seu valor em this.user, para ficar acessível tanto no model quando no controller.

        //Como estamos tratando de uma de uma promisse, precisamos envolve-la com o try-cath, pq se não teremos uma promessa não resolvida e não saberemos qual o erro que está ocorrendo.

        //tty-catch retirado, pois o mesmo inibiria o funcionamento do try-catch do loginController.

        this.user = await LoginModel.create(this.body);
        
    }

    async userExists(){
        //Vendo se na base de dados existe um email igual ao email que esta sendo enviado na requisição.
        this.user = await LoginModel.findOne({email: this.body.email});
        
        //caso a constante user seja true, ou seja, ja exista no db um erro será retornado.
        if(this.user) this.errors.push('Já existe um usuário com esse email.')
    }

    valida(){
        this.cleanUp();
        //Validação
        //O email precisa ser válido
        if(!validator.isEmail(this.body.email)) this.errors.push('E-mail inválido');

        //A senha precisa ter entre 3 e 30 caracteres
        if(this.body.password.length < 3 || this.body.password.length > 30){
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