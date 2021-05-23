const express = require('express');

const app = express();
const port = 3000;

app.listen(port, () => {
    console.log(`Соеденение установлено на порту ${port} .`);
});

app.set('view engine', 'ejs');
app.set('views', './client/views');

app.use(express.static('client'));
app.use(express.urlencoded({extended: false}));

app.get ('/', (request, response) => {
    response.render('registration.ejs');
});

app.post ('/name', (request, response) => {
    const name = request.body.username;
    response.render('main.ejs', {name});
});


