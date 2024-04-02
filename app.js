import "dotenv/config";
import connectDB from "./config/db.js";

import express from "express";
import path from "path";
import cors from "cors";

// rotas
import routes from "./routes/Router.js";

const port = process.env.PORT;

const app = express();

// Configurando o JSON e o form data response
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Conexão com o banco de dados
connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.use(routes);
