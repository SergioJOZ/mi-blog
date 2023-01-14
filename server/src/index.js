const dotenv = require("dotenv");
const { connection } = require("./database/connection");
const express = require("express");
const cors = require("cors");

dotenv.config();
//Inicializar app
console.log("App de node iniciada");

//Conectar a la base de atos
connection();

//Crear servidor node
const app = express();
const puerto = process.env.PORT || 8000;
// Configurar cors
app.use(cors());

// Convertir body a objeto js
app.use(express.json()); //Recibir datos con content-type app/JSON
app.use(express.urlencoded({ extended: true })); //form-url encoded

//Crear rutas
const routes_article = require("./routes/article");

//Cargo las rutas
app.use("/api", routes_article);
//Rutas prueba hardcodeadas
/*
app.get("/probando", (req, res) => {
  console.log("Se ha ejecutado el endpoint probando");

  return res.status(200).json([
    {
      curso: "Master en React",
      autor: "Victor Robles Web",
      url: "victorrroblesweb.es/master-react",
    },
    {
      curso: "Master en React",
      autor: "Victor Robles Web",
      url: "victorrroblesweb.es/master-react",
    },
  ]);
});

app.get("/", (req, res) => {
  return res.status(200).send(`
  <h1>Api rest con node </h1>
  `);
});
*/
//Crear servidor y escuchar peticion
app.listen(puerto, () => {
  console.log("Servidor corriendo en el puerto " + puerto);
});
