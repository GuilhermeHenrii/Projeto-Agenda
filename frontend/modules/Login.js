//Criando classes para validar os formulários
import isEmail from 'validator/lib/isEmail';
const validator = require('validator');

//nesse caso estamos criando uma classe que vai validar dois formulários, visto que ambos formulários são iguais e não necessitam de validações diferentes
export default class Login {
    constructor(formClass){
        this.form = document.querySelector(formClass);
    }

    init(){
       this.events();
    }

    events(){
        if(!this.form) return;
        this.form.addEventListener('submit', e => {
            e.preventDefault();
            this.validate(e);
        });
    }

    validate(e){
        //pegando o elemento que disparou o evento submit (formulario submetido) e pegando o input específico
        const el = e.target;
        const emailInput = el.querySelector('input[name="email"]');
        const passwordInput = el.querySelector('input[name="password"');
        let error = false;
        
        if(!validator.isEmail(emailInput.value)){
            alert('email invalido')
            error = true;
        }

        if(passwordInput.value.length < 3 || passwordInput.value.length > 30){
            alert('senha inválida');
            error = true;
        }
        
        //se não tiver nenhum erro, via o formulario
        if(!error) el.submit();
    }
    
}