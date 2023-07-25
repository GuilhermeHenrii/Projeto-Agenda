//Configuração webpack
const path = require('path');//importa o módulo path do Node.js, que fornece utilitários para manipulação de caminhos de arquivos e diretórios.

module.exports = {//é uma construção do Node.js que permite exportar um objeto como um módulo para uso em outros arquivos.
    mode: 'production',//define o modo de construção como desenvolvimento. Isso pode ser alterado para 'production' para otimizar o pacote resultante para produção.
    entry: './frontend/main.js',//especifica o arquivo de entrada do seu aplicativo.
    output: {//define as opções de saída
        path: path.resolve(__dirname, 'public', 'assets', 'js'),//especifica o diretório de saída para os arquivos empacotados.
        filename: 'bundle.js'// define o nome do arquivo de saída.
    },

    module: {
        rules: [{

            exclude: /node_modules/,

            test: /\.js$/,

            use:{
                loader: 'babel-loader',
                options: {
                    presets:['@babel/env']
                }
            }
        },{
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        }]
    },
    devtool: 'source-map'
}