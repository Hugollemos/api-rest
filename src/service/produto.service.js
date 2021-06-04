const { Types } = require("mongoose");
const Produto = require("../shared/domain/models/produto.model");

class ProdutoService {
  static async findAllProducts(response) {
    const produtos = await Produto.find();
    return response.status(!produtos ? 204 : 200).json(produtos || undefined);
  }

  static async findProductById(productId, response) {
    if (!Types.ObjectId.isValid(productId)) {
      return response.status(400).json({ message: "Id informado é inválido" });
    }

    const produtoExistente = await Produto.findById(productId);

    if (!produtoExistente) {
      return response.status(404).json({
        message: "Não foi possível encontrar um produto para o Id informado",
      });
    }

    return response.json(produtoExistente);
  }

  static async createProduct({ nome, fabricante, preco }, response) {
    if (!nome || !fabricante || !preco) {
      return response.status(400).json({
        message:
          "Não foram informados corretamente o nome, fabricante ou preço do produto",
      });
    }

    return response
      .status(201)
      .json(await Produto.create({ nome, fabricante, preco }));
  }

  static async deleteProduct(productId, response) {
    await Produto.findByIdAndRemove(productId);
    response.status(204).json();
  }
}

module.exports = ProdutoService;
