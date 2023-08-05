//Cirando classes para validar os formulários
//nesse caso estamos criando uma classe que vai validar dois formulários, visto que ambos formulários são iguais e não necessitam de validações diferentes
export default class Login {
    constructor(classForm){
        this.form = document.querySelector(classForm);
    }

    init(){
        return console.log(this.form);
    }

}