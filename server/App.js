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
    createUser(name).then(user => {
        if (user._id )
            response.render('main.ejs', {name});
        }).catch(e => console.log(e));
});

io.on('connect', (socket) => {
    console.log('client connected');
});