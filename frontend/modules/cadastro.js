import isEmail from 'validator/lib/isEmail';

const validator = require('validator');

export default class CadastraContato{
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
        let error = false;

        const inputName = el.querySelector('input[name="nome"]');
        const inputSurname = el.querySelector('input[name="sobrenome"]');
        const inputEmail = el.querySelector('input[name="email"]');
        const inputPhone = el.querySelector('input[name="telefone"]');
        
        if(inputName.value.length > 30 || inputName.value.length <= 1){
            error = true;
            const divError = document.querySelector('.div-error');
            inputName.classList.add('is-invalid');
            divError.classList.add('invalid-feedback');
            divError.textContent = 'Nome inválido';
        }

        if(inputSurname.value.length > 30 || inputName.value.length <= 1){
            error = true;
            alert('sobrenome invalido');
        }

        if(!validator.isEmail(inputEmail.value)){
            error = true;
            alert('email invalido');
        }

        if(!inputPhone.value){
            error = true;
            inputPhone.value = '';
        }

        if(!validator.isMobilePhone(inputPhone.value, 'pt-BR')){
            error = true;
            alert('numero de celular invalido');
        }
        
        //se não tiver erro executa o submite do form
        if(!error) el.submit();
    }
} 