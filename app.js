import "dotenv/config";

import express from "express";
import path from "path";
import cors from "cors";

const port = process.env.PORT;

const app = express();

// Configurando o JSON e o form data response
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
