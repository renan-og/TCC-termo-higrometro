const { where } = require('sequelize');
const { Op } = require('sequelize');
const Leitura = require("../models/valuesModel")
const ESP32_URL = 'https://petalled-anathematically-kathey.ngrok-free.dev/dados';

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
    try{
        const response = await fetch (ESP32_URL, {
            signal: AbortSignal.timeout(8000)
        });

        const dados = await response.json();

        const novaLeitura = await Leitura.create({
            temperatura:dados.temperatura,
            umidade:dados.umidade
        })
    } catch(error){
        console.error(error);
        res.status(400);
    }
}


module.exports = {
    obterDados,
    anotarDados
};