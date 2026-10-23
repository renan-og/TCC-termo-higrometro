const express = require('express');
const path = require('path');
const app = express();

//tentativa de rodar o ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(express.static(path.join(__dirname,'public')));

const routes = require('./routes/routes');

app.use('/', routes);

module.exports = app;