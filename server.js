require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const filmeRoutes = require("./routes/filmeRoutes");
const clienteRoutes = require("./routes/clienteRoutes");
const locacaoRoutes = require("./routes/locacaoRoutes");

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Conectado"))
  .catch((err) => console.log(err));

app.use("/filmes", filmeRoutes);
app.use("/clientes", clienteRoutes);
app.use("/locacoes", locacaoRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));
