const express = require('express');

const app = express();
const port = 3000;

app.listen(port, () => {
    console.log(`Соеденение установлено на порту ${port} .`);
});

app.set('view engine', 'ejs');
app.set('client', './client/views');

app.use(express.static('client'));
app.use(url.encoded({extended: false}));




