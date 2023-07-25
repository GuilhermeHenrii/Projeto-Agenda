//Resumo do módulo

require('dotenv').config();//variáveis de ambiente

const express = require('express');
const app = express();//Iniciando o express

//Chamando o pacote mongoose
const mongoose = require('mongoose');

// const connectionString = '';
//executando a conexão
//.then para tratar a promessa que é retornada quando declaramos mongoose.connect
//usando o app.emit para emitir um sinal.
mongoose.connect(process.env.connectionstring, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('Conectado')
        app.emit('pronto');
    })
    .catch((e) => {
        console.log(e);
    }); 


//Requerindo o modulo de sessão e mensagens instantaneas
const session = require('express-session');//coockie de sessão
const MongoStore = require('connect-mongo');//diz que a sessão será salva na base de dados
const flash = require('connect-flash');//mensagens autodestrutivas e instantaneas, são salvas na sessão


const routes = require('./routes');//são as rotas da aplicação
const path = require('path');//Trabalha com caminhos

//importanto helmet e csrf
const helmet = require('helmet');//Um total de 9 middlewares que tem como função tratar a seguranla do cabeçalho http da aplicação
const csrf = require('csurf');//csrf tokens para os formularios. Nenhum app externo conseguirá postar coisas dentro da aplicação.
const {middlewareGlobal, checkErrorCsrf, csfrMiddleware} = require ('./src/middlewares/middleware');//são funções que são executadas na rota 

//usando o helmet
app.use(helmet());

app.use(express.urlencoded({ extend:true }));//diz que podemos postar formulários para dentro da aplicação
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'public')));//criando o express static e resolvendo seu caminho absoluto. São todos os arquivos estáticos que devem ser acessados direto, na aplicação.

const sessionOptions = session({
    secret: '123456',
    store: MongoStore.create({mongoUrl: process.env.connectionstring}),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
    }
})
app.use(sessionOptions);
app.use(flash());

app.set('views', path.resolve(__dirname, 'src', 'views'));//estou criando a view e passando seu caminho. Arquitos que renderizam na tela.
app.set('view engine', 'ejs');//Aqui estou setando a view engine. Engina esse que renderizará o html da página

//usando o csrf
app.use(csrf());

//middlewares proprios
app.use(middlewareGlobal);//todos as requisições, em todas as rotas e em todos os verbos iram executar este middleware
//usando um midlleware global para o uso do csrf
app.use(checkErrorCsrf);
app.use(csfrMiddleware);

app.use(routes);

//usando o app.on para 'capturar' o sinal "pronto" e realizar a conexão entre o servidor e o banco de dados
app.on('pronto', () => {
    app.listen(3000, () =>{
        console.log('Acessar http://localhost:3000');
        console.log('Servidor executando na porta 3000');
    });
})