const express = require('express');
const socket = require('socket.io');

const {createUser} = require('./crud.js');

const app = express();
const port = 3000;

const server = app.listen(port, () => {
    console.log(`Соеденение установлено на порту ${port} .`);
});

const io = socket(server);

app.set('view engine', 'ejs');
app.set('views', './client/views');

app.use(express.static('client'));
app.use(express.urlencoded({extended: false}));

app.get ('/', (request, response) => {
    response.render('registration.ejs');
});

app.post ('/name', (request, response) => {
    const name = request.body.username;
    createUser(name).then(user => console.log(user)).catch(e => console.log(e));
    response.render('main.ejs', {name});
});

io.on('connect', (socket) => {
    console.log('client connected');
});


