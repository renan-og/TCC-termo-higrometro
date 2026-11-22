const express = require('express');
const router = express.Router();

const controllerDados = require('../controller/controllerDados');

let ultimaLeitura = {
    temperatura: 0,
    umidade: 0,
    tempo: 0,
    nome: "Main-ESP32"
};

/* router.get('/dados', controllerDados.obterDados);
router.get("/", controllerDados.obterDados);
 */
router.post('/dados', (req, res) => {
  const { temperatura, umidade, tempo, nome } = req.body || {};
  if (temperatura !== undefined && umidade !== undefined) {
    ultimaLeitura = { temperatura, umidade, tempo, nome };
    return res.status(200).json({ status: 'ok' });
  }
  res.status(400).json({ erro: 'Dados invalidos' });
});

// 2. Rota que renderiza o seu frontend EJS
router.get('/', (req, res) => {
  res.render('dashboard', { dados: ultimaLeitura, erro:'Erro ao se conectar ao ESP32' });
});
//Dados fícticios pra testar o front e algumas variáveis supostas, @renan-og corrige dps
//Rota do site

module.exports = router;