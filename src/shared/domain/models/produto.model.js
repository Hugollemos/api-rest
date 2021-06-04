const mongoose = require("mongoose");

module.exports = mongoose.model("Produto", {
  nome: { type: String },
  fabricante: { type: String },
  preco: { type: Number },
});
