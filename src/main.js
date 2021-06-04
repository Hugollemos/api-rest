const App = require("./app");
const ProdutoController = require("./controller/produto.controller");

const app = new App({
  controllers: [new ProdutoController()],
});

app.listen();
