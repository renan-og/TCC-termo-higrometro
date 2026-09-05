const express = require('express');
const app = express();
const port = 3000;

const ESP32_URL = 'http://10.129.173.163/dados'

app.listen(port, ()=>{
    console.log(`servidor rodando na porta ${port}`);
})

module.exports = app;
module.exports = ESP32_URL;