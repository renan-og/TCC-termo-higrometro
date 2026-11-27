const express = require('express');
const router = express.Router();

const controllerDados = require('../controller/controllerDados');

router.post("/", controllerDados.anotarDados)
router.get("/", controllerDados.obterDados);
router.get('/dados', controllerDados.obterDados);
 

router.get('/dados', controllerDados.obterDados);

//Dados fícticios pra testar o front
router.get('/desenvolvimento', (req, res) => {
  const variacao = Number(((Math.random() - 0.5) * 3).toFixed(1));
  const temperatura = Number((25.7 + variacao).toFixed(1));
  const umidade = Number((72.3 + variacao * 2).toFixed(1));

  res.render('dashboard', {
    response: 'ok',
    error: null,
    dados: {
      nome: 'Main-ESP32-Dev',
      temperatura,
      umidade,
      tempo: 0
    },
    graficoSemanal: {
      mediasTemp: [22.1, 23.4, 24.0, 25.7, 26.2, 24.9, 23.8],
      mediasUmid: [58.0, 61.2, 63.5, 72.3, 68.4, 64.0, 60.5]
    }
  });
});

// Endpoint JSON usado a cada 5s apenas quando a página aberta for /desenvolvimento
router.get('/desenvolvimento/dados', (req, res) => {
  const variacao = Number(((Math.random() - 0.5) * 4).toFixed(1));
  const temperatura = Number((25.7 + variacao).toFixed(1));
  const umidade = Number((72.3 + variacao * 2.5).toFixed(1));

  res.json({
    dados: {
      nome: 'Main-ESP32-Dev',
      temperatura,
      umidade,
      tempo: 0
    },
    graficoSemanal: {
      mediasTemp: [22.1, 23.4, 24.0, temperatura, 26.2, 24.9, 23.8],
      mediasUmid: [58.0, 61.2, 63.5, umidade, 68.4, 64.0, 60.5]
    }
  });
});

router.get('/monitoramento/erro', (req, res) => {
    const dados = {
        nome: 'erro',
        temperatura: 'erro',
        umidade: 'erro',
        ultimaAtualizacao: 'erro'
    };

    // PASSANDO O ESTADO DE ERRO PARA TESTAR O VISUAL:
    res.render('dashboard', { 
        dados, 
        response: 'erro', 
        erro: 'Simulação: Falha ao se conectar ao ESP32 físico.' 
    });
});

module.exports = router;