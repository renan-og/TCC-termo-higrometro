const Leitura = require("../models/valuesModel");
const ESP32_URL = 'https://petalled-anathematically-kathey.ngrok-free.dev/dados';

const NGROK_HEADERS = {
  'ngrok-skip-browser-warning': 'true'
};

// GET / -> Renderiza o dashboard com a leitura atual + histórico estático do gráfico
const obterDados = async (req, res) => {
  try {
    const response = await fetch(ESP32_URL, {
      headers: NGROK_HEADERS,
      signal: AbortSignal.timeout(8000)
    });

    const dados = await response.json();

    // Busca as últimas 20 leituras salvas no TiDB Cloud para montar o gráfico
    const ultimasLeituras = await Leitura.findAll({
      order: [['createdAt', 'DESC']],
      limit: 20
    });
    const historico = ultimasLeituras.reverse();

    res.render('dashboard', { dados, response: 'ok', historico });
  } catch (error) {
    console.error('Erro ao conectar ao ESP32:', error.message);

    const ultimasLeituras = await Leitura.findAll({
      order: [['createdAt', 'DESC']],
      limit: 20
    }).catch(() => []);

    const dados = {
      nome: "erro",
      temperatura: "erro",
      umidade: "erro",
      ultimaAtualizacao: "erro"
    };

    res.render('dashboard', {
      dados,
      response: "erro",
      historico: ultimasLeituras.reverse(),
      erro: 'Erro ao se conectar ao ESP32'
    });
  }
};

// POST / -> Chamado em segundo plano a cada 5s apenas para gravar no TiDB Cloud
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