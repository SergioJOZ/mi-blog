const express = require("express");
const multer = require("multer");
const Articlecontroller = require("../controllers/article");

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `./src/images/articles`);
  },
  filename: function (req, file, cb) {
    cb(null, `article${Date.now()}${file.originalname}`);
  },
});

const uploaded = multer({ storage: storage });

//Rutasd de prueba
router.get("/ruta-de-prueba", Articlecontroller.prueba);
router.get("/cursos", Articlecontroller.curso);

//Ruta util
router.post("/crear-articulo", Articlecontroller.create);
router.get("/articulos/:ultimos?", Articlecontroller.getArticles);
router.get("/articulo/:id", Articlecontroller.getArticle);
router.delete("/articulo/:id", Articlecontroller.deleteArticle);
router.put("/articulo/:id", Articlecontroller.editArticle);
router.post(
  "/subir-imagen/:id",
  [uploaded.single("file0")],
  Articlecontroller.upload
);
router.get("/imagen/:file", Articlecontroller.getImage);
router.get("/buscar/:busqueda", Articlecontroller.browse);
module.exports = router;
