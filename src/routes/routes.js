const express = require('express');
const router = express.Router();

const controllerDados = require('../controller/controllerDados');

router.post("/", controllerDados.anotarDados)
router.get("/", controllerDados.obterDados);
 

module.exports = router;