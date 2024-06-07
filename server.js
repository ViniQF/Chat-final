const express = require('express');
const res = require('express/lib/response');
const { Socket } = require('socket.io');

//Importar os modulos FRAMEWORKS
const app = require('express')();

const http = require('http').createServer(app);

const io = require('socket.io')(http);

app.use(express.static('public'));

//Rota para a pagina principal
app.get('/', (req,res) => res.sendFile(__dirname + '/public//index.html'));

//Evento para quando o usuario conectar ao servidor
io.on('connection', (socket) => {
    console.log('Usuario conectado')

    //Evento para quando envia uma mensagem
    socket.on('chat message', (data) => io.emit('chat message', data));

    //Evento para quando o usuario desconectar
    socket.on('disconnect', () => console.log('Usuario desconectou do server'))

});

const porta = 3000;

//Iniciar o chat
http.listen(3000,() => {
    console.log(`Servidor rodando - Link http://localhost:3000`)
});