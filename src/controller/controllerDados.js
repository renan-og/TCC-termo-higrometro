//declaração do esp pra n ficar vazio
const ESP32_URL = '"https://petalled-anathematically-kathey.ngrok-free.dev/dados"';

const obterDados = async (req, res) => {
    try{
        const response = await fetch (ESP32_URL, {
            signal: AbortSignal.timeout(8000)
        });

        if(!response.ok) {
            return res.status(response.status).json({ erro: 'ESP32 retornou erro HTTP'});
        }

        const dados = await response.json();
        
        //res.render('dashboard', { sensor });//dados ficticios
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

module.exports = {
    obterDados
};