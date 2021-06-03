require('dotenv').config();
const express = require('express')
const app = express('');
const mongoose = require('mongoose')
const port = process.env.PORT || 8081
require('./models/Produto');
const Produto = mongoose.model('Produto');

// confugurar o recebimento de Json
app.use(express.json())
app.use(express.urlencoded({ extended: true}))
//CONFIG MONGOOSE
mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser: true, useUnifiedTopology: true},() => {
  console.log('Banco de dados conectados')
})

//carregando o model do produto

//rotas
app.post("/produto",(req, res) => {
  if(req.body.nome != undefined && req.body.fabricante != undefined && req.body.preco !=undefined) {

    var produto = new Produto({
      nome: req.body.nome, fabricante: req.body.fabricante, preco:req.body.preco
    });
  
    produto.save().then(() => {
      //dado salvo com sucesso
      res.statusCode = 201
      res.send();
    }).catch((erro) => {
      if(erro){
        throw erro;
      }
      //Aconteceu alguma falha
      res.statusCode = 417;
      res.send();
    })
  }else {
    res.statusCode = 406;
    res.send();
  }

})

app.get('/produto',(req, res) => {
  Produto.find({}, (erro, dados) => {
    if(erro) {
      res.statusCode = 417,
      res.send();
    }
    res.json(dados);
  })
});

app.get('/produto/:id',(req, res) => {
  Produto.findById(req.params.id).then((produto) => {
    res.statusCode = 200;
    res.json(produto);
  }).catch((erro) => {
    if(erro) {
      res.statusCode = 417;
      res.send();
      throw erro;
      }
  });
});

app.delete('/produto/:id', (req, res) => {
  Produto.findByIdAndRemove(req.params.id).then((produto) => {
    if(produto){
      res.statusCode = 200;
      res.send();

    }else{
      res.statusCode = 404
      res.send();
    }
  }).catch((erro) => {
    if(erro){
      res.statusCode = 417;
      res.send();
      throw erro;
    }
  });
})




//PORTA
app.listen(port, () => {
  console.log('Servidor rodando na porta http://locahost8081')
});