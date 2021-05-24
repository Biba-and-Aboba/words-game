const e = require('express');
const express = require('express');
const socket = require('socket.io');
const messages = require('./messages.js');

const {createUser, updateStatus, getOnlineUsers, removeUser, getCurrentWord, resetGame} = require('./crud.js');

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

app.get('/name', (request, response) => {
    const name = app.locals.name;
    response.render('main.ejs', {name});
});

app.post ('/name', (request, response) => {
    const name = request.body.username;
    app.locals.name = name;
    createUser(name).then(user => {
        if (user._id )
            response.render('main.ejs', {name});
        }).catch(e => console.log(e));
});

io.on('connect', (socket) => {

    updateOnlineUsers();

    const name = app.locals.name;

    console.log('client connected');

    getCurrentWord(name).then(currWord => {
        if(currWord !== null){
            io.emit('msg', (currWord));
        }
    }).catch(e => console.log(e));

    socket.on ('word', (word) => {
        updateStatus(name, word).then(res => {
            if (messages[res] != undefined){
                const invalidMsg = messages[res];
                io.to(socket.id).emit('msg', invalidMsg);
            } else {
                io.emit('msg', (res));
                updateOnlineUsers(); //обновление очков
            }
        }).catch(e => console.log(e));
    });

socket.on('disconnect', () => {
    removeUser(name).then((res) => {
        if(res.n === 1) {
            socket.broadcast.emit('alert', (name));
            updateOnlineUsers();
        }
    });

    if(socket.conn.server.clientsCount === 0) {
        resetGame().catch((e) => console.log(e));
    }
});

function updateOnlineUsers(){
    getOnlineUsers().then(users => {
        io.emit('activeUsers', (users));
    }).catch(e => console.log(e));
}

});