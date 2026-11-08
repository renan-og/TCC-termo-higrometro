const express = require('express');
const router = express.Router();

const controllerDados = require('../controller/controllerDados');

router.get('/dados', controllerDados.obterDados);
router.get("/", controllerDados.obterDados);

//Dados fícticios pra testar o front e algumas variáveis supostas, @renan-og corrige dps
//Rota do site

module.exports = router;