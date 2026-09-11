app.use(express.static(
    path.join(__dirname, 'src/public')
));
//Dados fícticios pra testar e algumas variáveis supostas, @renan-og corrige dps
const sensor = {
    nome: "ESP32-001",
    temperatura: 24,
    umidade: 81,
    conectado: true,
    ultimaAtualizacao: 5
};