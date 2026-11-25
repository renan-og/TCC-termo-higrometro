const app = require('./src/app.js');
const port = 3000;
require('dotenv').config();

const sequelize = require('./src/config/database.js'); // ajuste o caminho se necessário
const Leitura = require('./src/models/valuesModel.js'); // garante que o model seja carregado

// Sincroniza todas as tabelas ao iniciar o servidor
sequelize.sync()
  .then(() => {
    console.log('Tabelas sincronizadas com sucesso no TiDB Cloud!');
  })
  .catch((erro) => {
    console.error('Erro ao sincronizar tabelas:', erro);
  });
app.listen(port, ()=>{
    console.log(`Servidor rodando na porta ${port}`);
    console.log(`http://localhost:${port}/dados`);
})
