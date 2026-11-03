// CONTROLLER (SSR) de Produto — traduz HTTP <-> views (res.render + PRG).
// O formulário de produto tem um <select> de categorias, então o método que
// mostra o formulário precisa BUSCAR a lista de categorias e enviá-la à view
// (e também ao reexibir o form quando a validação falhar).
//
// Ações:
//   - index (GET /produtos)      -> listagem (mostrando a categoria de cada produto);
//   - novo  (GET /produtos/novo) -> formulário vazio + lista de categorias;
//   - criar (POST /produtos)     -> cria e redireciona; erro 4xx reexibe o form.
export class ProdutosController {
  constructor(produtosService, categoriasService) {
    this.service = produtosService;
    this.categoriasService = categoriasService; // para montar o <select> de categorias
    // Dica: "amarre" o this dos métodos usados como callback nas rotas.
  }
  // TODO: implemente index, novo, criar.


  async listar(_req, res, next) {
    try {
      const produtos = await this.service.listarTodos();
      res.render('produtos/index', { titulo: 'Produtos', produtos });
    } catch (err) { next(err); }
  }

  async novo(_req, res) {
    res.render('produtos/new', {
      titulo: 'Novo Produto',
      erros: [],
      dados: {}
    })
  }

  async create(req, res, next) {
    try {
      await this.service.criar(req.body);
      res.redirect('/produtos');
    } catch (err) {
      if (err.statusCode < 500) {
        return res.status(err.statusCode).render('produtos/new', {
          titulo: 'Novo Produto',
          erros: [err.message],
          dados: req.body,
        });
      }
      next(err);

    }
  }

}
