import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

import clienteRoutes from "./routes/clienteRoutes.js";
import filmeRoutes from "./routes/filmeRoutes.js";
import locacaoRoutes from "./routes/locacaoRoutes.js";

dotenv.config();
const app = express();
app.use(express.json());

// Conectar ao MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB conectado!"))
  .catch(err => console.error(err));

// Rotas
app.use("/clientes", clienteRoutes);
app.use("/filmes", filmeRoutes);
app.use("/locacoes", locacaoRoutes);

app.listen(3000, () => console.log("Servidor rodando na porta 3000"))