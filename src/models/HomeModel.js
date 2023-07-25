//Geralmente os models serão uma classe, por isso a sintaxe com letra maiúscula no começo

//O mongoDb não quer saber como esses dados serão salvos. Por isso toda essa configuração
//Mongodb é nosql
//criação de schema
const mongoose = require('mongoose');
const HomeSchema = new mongoose.Schema({
    titulo: {type: String, required: true},
    descricao: String
});

//criação do model
const HomeModel = mongoose.model('Home', HomeSchema);

module.exports = HomeModel;