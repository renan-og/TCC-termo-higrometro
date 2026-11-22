const express = require('express');
const router = express.Router();

const controllerDados = require('../controller/controllerDados');

router.get('/dados', controllerDados.obterDados);
router.get("/", controllerDados.obterDados);
 

module.exports = router;