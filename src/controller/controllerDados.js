const { where } = require('sequelize');
const { Op } = require('sequelize');
const Leitura = require("../models/valuesModel")
const ESP32_URL = 'https://petalled-anathematically-kathey.ngrok-free.dev/dados';

const NGROK_HEADERS = {
  'ngrok-skip-browser-warning': 'true'
};

const obterDados = async (req, res) => {
    try{
        const response = await fetch (ESP32_URL, {
            signal: AbortSignal.timeout(8000)
        });

        const dados = await response.json();
        
        res.render('dashboard', { dados, response });//dados reais do ESP
        //return res.json(dados);
    } catch(error) {
        const response = "erro";
        const dados = {
            nome: "erro",
            temperatura : "erro",
            umidade : "erro",
            ultimaAtualizacao: "erro"
        };
        console.error('Erro ao conectar ao ESP32:', error.message);
        res.render('dashboard', { dados, response, erro:'Erro ao se conectar ao ESP32', error });
    }
};
const anotarDados = async (req, res) => {
  try {
    const response = await fetch(ESP32_URL, {
      headers: NGROK_HEADERS,
      signal: AbortSignal.timeout(8000)
    });

    const dados = await response.json();

    const novaLeitura = await Leitura.create({
      temperatura: Number(dados.temperatura),
      umidade: Number(dados.umidade)
    });

    // Encerra a requisição HTTP com sucesso
    return res.status(201).json({ status: 'salvo', id: novaLeitura.id });
  } catch (error) {
    console.error('Erro ao anotar dados:', error.message);
    return res.status(400).json({ erro: error.message });
  }
};


module.exports = {
    obterDados,
    anotarDados
};