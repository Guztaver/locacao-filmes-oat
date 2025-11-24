import Locacao from "../models/Locacao.js";
import Cliente from "../models/Cliente.js";
import Filme from "../models/Filme.js";

/**
 * Criar nova locação
 */
export async function criarLocacao(req, res) {
  try {
    const { cliente, filme } = req.body;

    if (!cliente || !filme) {
      return res.status(400).json({ error: "Cliente e Filme são obrigatórios." });
    }

    const clienteExiste = await Cliente.findById(cliente);
    const filmeExiste = await Filme.findById(filme);

    if (!clienteExiste) {
      return res.status(404).json({ error: "Cliente não encontrado." });
    }

    if (!filmeExiste) {
      return res.status(404).json({ error: "Filme não encontrado." });
    }

    const novaLocacao = await Locacao.create({
      cliente,
      filme,
      dataLocacao: new Date(),
      devolvido: false
    });

    res.status(201).json(novaLocacao);

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

/**
 * Listar locações + filtros
 */
export async function listarLocacoes(req, res) {
  try {
    const { devolvido, cliente, filme, status } = req.query;

    let filtro = {};

    if (devolvido !== undefined) {
      filtro.devolvido = devolvido === "true";
    }

    if (cliente) filtro.cliente = cliente;

    if (filme) filtro.filme = filme;

    if (status === "atrasada") {
      filtro.devolvido = false;
      filtro.dataLocacao = {
        $lte: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) // +3 dias
      };
    }

    const locacoes = await Locacao.find(filtro).populate("cliente filme");

    res.json(locacoes);

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

/**
 * Marcar como devolvido
 */
export async function devolverFilme(req, res) {
  try {
    const { id } = req.params;

    const locacao = await Locacao.findById(id);

    if (!locacao) {
      return res.status(404).json({ error: "Locação não encontrada." });
    }

    if (locacao.devolvido === true) {
      return res.status(400).json({ error: "Este filme já foi devolvido." });
    }

    locacao.devolvido = true;
    locacao.dataDevolucao = new Date();

    await locacao.save();

    res.json({
      mensagem: "Filme devolvido com sucesso.",
      locacao
    });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
