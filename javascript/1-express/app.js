const express = require("express");
const http = require("http");

const app = express(); // Obtendo a instância do Express

app.use(express.json());

const indexRoutes = require('./routes/index');
const pessoaRoutes = require('./routes/pessoa');

app.use('/',indexRoutes); //Rotas principais da aplicação
app.use('/pessoa', pessoaRoutes); //Rotas de Pessoa

// Configurar uma rota da aplicação (Método GET do HTTP)
/*
app.get('/', (request, response) => {
    console.log("Oba! Chegou uma requisição");

    response.send("OK cliente, sua requisição chegou!");
});
*/


http.createServer(app).listen(3000, () => {
    console.log("Servidor executando na porta 3000");
});