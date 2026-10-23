const app = require('./src/app.js');
const port = 3000;

//comentei pra testar o front
//const ESP32_URL = 'http://192.168.0.110/dados';

app.listen(port, ()=>{
    console.log(`Servidor rodando na porta ${port}`);
})


/* app.get('/', (req, res) => {
    res.render('dashboard');
}); */

//Teste de rotas (problema no controller)
//const routes = require('./routes/routes');
//app.use('/', routes);

/* app.get('/teste', (req, res) => {
    res.send('Servidor funcionando!!!!');
});

app.get('/dados', async (req, res) => {
    try{
        const response = await fetch (ESP32_URL, {
            signal: AbortSignal.timeout(8000)
        });

        if(!response.ok) {
            return res.status(response.status).json({ erro: 'ESP32 retornou erro HTTP'});
        }

        const dados = await response.json();
        return res.json(dados);
    } catch(error) {
        console.error('Erro ao conectar ao ESP32:', error.message);
        return res.status(502).json({
            erro:'Não foi possível se conectar ao microcontrolador',
            detalhes: error.message
        });
    }
}); */
