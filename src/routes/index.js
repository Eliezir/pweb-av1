import { Router } from 'express';
import { ProdutosRepository } from '../repositories/produtos.repository.prisma.js'
import { validarCriacaoProduto, validarCriacaoCategoria } from '../middlewares/validacao.middleware.js';


// COMPOSITION ROOT + ROTAS SSR.
// Monte a cadeia de dependências (repositório -> service -> controller) das duas
// entidades e declare as rotas.
//
// Rotas que a aplicação precisa ter:
//   GET  /                   -> redireciona para /produtos
//   -- Categorias --
//   GET  /categorias         -> listagem
//   GET  /categorias/nova    -> formulário de nova categoria (declare ANTES de rotas com :id, se houver)
//   POST /categorias         -> validar entrada e criar
//   -- Produtos --
//   GET  /produtos           -> listagem
//   GET  /produtos/novo      -> formulário de novo produto
//   POST /produtos           -> validar entrada e criar


export function criarRotas() {
  const router = Router();

  // TODO: instanciar repositórios, services e controllers; declarar as rotas acima.


  const produtosRepository = new ProdutosRepository();   // ← única linha que muda
  const produtosService = new ProdutosService(produtosRepository);
  const produtosController = new ProdutosController(produtosService);

  const categoriaRepository = new ProdutosRepository();   // ← única linha que muda
  const categoriaService = new ProdutosService(categoriaRepository);
  const categoriaController = new ProdutosController(categoriaService);

  router.get('/', produtosController.listar())
  router.post('/produto', validarCriacaoProduto, produtosController.criar);
  router.get('/categorias', categoriaController.listar())
  router.post('/categorias', validarCriacaoProduto, categoriaController.criar);

  return router;
}
