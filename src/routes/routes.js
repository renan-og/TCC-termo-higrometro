const express = require('express');
const router = express.Router();

const controllerDados = require('../controller/controllerDados');

router.get('/dados', controllerDados.obterDados);

//Dados fícticios pra testar e algumas variáveis supostas, @renan-og corrige dps
//Rota do site
router.get('/monitoramento', (req, res) => {

    const sensor = {
        nome: 'ESP32-001',
        temperatura: 24,
        umidade: 81,
        ultimaAtualizacao: 5
    };

    res.render('dashboard', { sensor });
});

module.exports = router;