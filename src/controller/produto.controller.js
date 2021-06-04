const { Router } = require("express");
const ProdutoService = require("../service/produto.service");

class ProdutoController {
  path = "/produto";
  router = Router();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get(this.path, this.findAllProducts);
    this.router.get(`${this.path}/:id`, this.findProductById);
    this.router.post(this.path, this.createProduct);
    this.router.delete(`${this.path}/:id`, this.deleteProduct);
  }

  findAllProducts(_, response) {
    return ProdutoService.findAllProducts(response);
  }

  findProductById({ params }, response) {
    return ProdutoService.findProductById(params.id, response);
  }

  createProduct({ body }, response) {
    return ProdutoService.createProduct(body, response);
  }

  deleteProduct({ params }, response) {
    return ProdutoService.deleteProduct(params.id, response);
  }
}

module.exports = ProdutoController;
