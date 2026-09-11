const express = require('express');
const app = express();
const port = 3000;

const ESP32_URL = 'http://10.129.173.163/dados'

app.listen(port, ()=>{
    console.log(`Servidor rodando na porta ${port}`);
})

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('main');
});

module.exports = app;