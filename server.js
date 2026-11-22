const app = require('./src/app.js');
const port = 3000;

//comentei pra testar o front
//const ESP32_URL = 'http://192.168.0.110/dados';

app.listen(port, ()=>{
    console.log(`Servidor rodando na porta ${port}`);
    console.log(`http://localhost:${port}/dados`);
})
