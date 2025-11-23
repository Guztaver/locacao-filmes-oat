import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import filmeRoutes from "./routes/filmeRoutes.js";
import clienteRoutes from "./routes/clienteRoutes.js";
import locacaoRoutes from "./routes/locacaoRoutes.js";

import swaggerSpec from "./config/swagger.js";
import { apiReference } from "@scalar/express-api-reference";

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

app.use(
  "/docs",
  apiReference({
    theme: "purple",
    layout: "modern",
    spec: {
      content: swaggerSpec,
    },
  })
);

const PORT = process.env.PORT || 3000;

// In ESM, require.main === module is not available.
// We can check if the file is being run directly by comparing import.meta.url
// However, for Vercel, we generally export the app.
// We will listen only if not in a serverless environment (or if run directly locally)
// A simple way is to check if we are in production/vercel environment or just run it.
// But to keep it close to original logic:
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));
}

export default app;
