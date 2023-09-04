import isEmail from 'validator/lib/isEmail';

const validator = require('validator');

export default class CadastraContato {
    constructor(formClass) {
        this.form = document.querySelector(formClass);
    }

    init() {
        this.events();
    }

    events() {
        if (!this.form) return;

        this.form.addEventListener('submit', e => {
            e.preventDefault();
            this.validate(e);
        });
    }

    generatesFieldError(field, text) {
        field.classList.add('is-invalid');

        const divError = document.createElement('div');
        divError.classList.add('invalid-feedback');

        divError.innerHTML = `${text}`.toUpperCase();

        field.insertAdjacentElement('afterend', divError);
    }

    generatesGeneralError(field, text) {
        const divError = document.createElement('div');
        //classe d-block adicionada para remover a estilização padrao do boostrap para campos invalidos: display:none
        divError.classList.add('invalid-feedback', 'd-block', 'text-center');

        divError.innerHTML = `${text}`.toUpperCase();

        field.insertAdjacentElement('afterend', divError);
        return divError;
    }

    containsNumber(string) {
        return /\d/.test(string);
    }

    validate(e) {
        //pegando o elemento que disparou o evento submit (formulario submetido) e pegando o input específico
        const el = e.target;
        let error = false;


        const inputName = el.querySelector('input[name="nome"]');
        const inputSurname = el.querySelector('input[name="sobrenome"]');
        const inputEmail = el.querySelector('input[name="email"]');
        const inputPhone = el.querySelector('input[name="telefone"]');
        const paragraph = document.querySelector('.paragraph');
        const elementsOfDocument = document.querySelectorAll('*');


        for (let msgError of this.form.querySelectorAll('.invalid-feedback')) {
            msgError.remove();
        };

        for (let msgError of this.form.querySelectorAll('.is-invalid')) {
            msgError.classList.remove('is-invalid');
        };

        for (let msgError of elementsOfDocument) {
            if (msgError.classList.contains('d-block')) {
                msgError.remove();
            }
        }

        if (inputName.value.length > 30 || inputName.value.length <= 1 || this.containsNumber(inputName.value)) {
            error = true;
            return this.generatesFieldError(inputName, `${inputName.name} inválido`);
        }

        if (inputSurname.value.length > 30 || this.containsNumber(inputSurname.value)) {
            error = true;
            this.generatesFieldError(inputSurname, `${inputSurname.name} inválido`);
        }

        if(inputEmail.value.trim() !== ''){
            if(!validator.isEmail(inputEmail.value)){
                error = true;
                this.generatesFieldError(inputEmail, `${inputEmail.name} inválido`);
            };
        }

        //logica usada para verificar se o campo nao esta vazio, se n tiver verifica os campos. Se OS DOIS campos estiverem vazios, o erro é gerado. Se um tiver vazio e o outro preenchido e válido, o cadastro é feito.
        if(inputPhone.value.trim() !== ''){
            if(!validator.isMobilePhone(inputPhone.value, 'pt-BR')){
                console.log( typeof inputPhone.value);
                error = true;
                this.generatesFieldError(inputPhone, `${inputPhone.name} inválido`);  
            }
        }

        if(inputEmail.value.trim() === '' && inputPhone.value.trim() === ''){
            error = true;
            this.generatesGeneralError(paragraph, `${inputEmail.name} ou ${inputPhone.name} devem ser preenchidos`);
        }


        //se não tiver erro executa o submit do form
        if (!error) el.submit();
    }
} 