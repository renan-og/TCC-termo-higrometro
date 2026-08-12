const app = require("./server");

app.post("/dados", (req, res)=>{
    ultimoDado = req.body();
    console.log(`ultimos dados: ${ultimoDado}`);
    res.status(200).json({menssagem : "sucesso"});
})

app.get("/dados", (req, res)=>{
    res.json(ultimoDado);
})