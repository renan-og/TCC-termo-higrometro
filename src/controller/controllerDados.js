const { Op, fn, col } = require('sequelize');
const Leitura = require("../models/valuesModel");
const ESP32_URL = https://mhz-comments-week-pulling.trycloudflare.com/dados';

const NGROK_HEADERS = {
  'ngrok-skip-browser-warning': 'true'
};

// Função auxiliar que calcula a média de temperatura e umidade por dia da semana (últimos 7 dias)
async function obterMediasSemana() {
  const seteDiasAtras = new Date();
  seteDiasAtras.setDate(seteDiasAtras.getDate() - 7);

  const resultados = await Leitura.findAll({
    attributes: [
      [fn('DAYOFWEEK', col('createdAt')), 'diaSemana'], // 1 = Dom ... 7 = Sáb
      [fn('AVG', col('temperatura')), 'mediaTemp'],
      [fn('AVG', col('umidade')), 'mediaUmid']
    ],
    where: {
      createdAt: { [Op.gte]: seteDiasAtras }
    },
    group: [fn('DAYOFWEEK', col('createdAt'))],
    raw: true
  });

  // Preenche os 7 dias da semana (0 onde ainda não há leituras)
  const mediasTemp = [0, 0, 0, 0, 0, 0, 0];
  const mediasUmid = [0, 0, 0, 0, 0, 0, 0];

  resultados.forEach(item => {
    const indice = Number(item.diaSemana) - 1; // converte 1..7 para índice 0..6
    if (indice >= 0 && indice <= 6) {
      mediasTemp[indice] = Number(Number(item.mediaTemp).toFixed(1));
      mediasUmid[indice] = Number(Number(item.mediaUmid).toFixed(1));
    }
  });

  return { mediasTemp, mediasUmid };
}

// GET / -> Renderiza o dashboard com leitura atual + médias semanais para o gráfico de colunas
const obterDados = async (req, res) => {
  try {
    const response = await fetch(ESP32_URL, {
      headers: NGROK_HEADERS,
      signal: AbortSignal.timeout(8000)
    });

    const dados = await response.json();
    const graficoSemanal = await obterMediasSemana();

    res.render('dashboard', { dados, response: 'ok', graficoSemanal });
  } catch (error) {
    console.error('Erro ao conectar ao ESP32:', error.message);

    const graficoSemanal = await obterMediasSemana().catch(() => ({
      mediasTemp: [0, 0, 0, 0, 0, 0, 0],
      mediasUmid: [0, 0, 0, 0, 0, 0, 0]
    }));

    const dados = {
      nome: "erro",
      temperatura: "erro",
      umidade: "erro",
      tempo: "erro"
    };

    res.render('dashboard', {
      dados,
      response: "erro",
      graficoSemanal,
      erro: 'Erro ao se conectar ao ESP32',
      error: error.message
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

    const temp = Number(dados.temperatura ?? dados.Temperatura ?? dados.temp);
    const umid = Number(dados.umidade ?? dados.Umidade ?? dados.umid);

    if (Number.isNaN(temp) || Number.isNaN(umid)) {
      return res.status(400).json({ erro: 'Valores inválidos do ESP32', recebido: dados });
    }

    const novaLeitura = await Leitura.create({
      temperatura: temp,
      umidade: umid
    });

    const graficoSemanal = await obterMediasSemana().catch(() => null);

    return res.status(201).json({
      status: 'salvo',
      id: novaLeitura.id,
      dados,
      graficoSemanal
    });
  } catch (error) {
    console.error('Erro ao anotar dados:', error.message);
    return res.status(400).json({
      erro: error.message,
      detalhes: error.errors ? error.errors.map(e => e.message) : null
    });
  }
};

module.exports = {
  obterDados,
  anotarDados
};