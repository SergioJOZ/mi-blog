const validateArticle = require("../helpers/validateArticle");
const Article = require("../model/Article");
const fs = require("fs");
const path = require("path");
const { find } = require("../model/Article");

const prueba = (req, res) => {
  return res.status(200).json({
    message: "Soy una accion de prueba en controlador articulos",
  });
};

const curso = (req, res) => {
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
};

const create = (req, res) => {
  //Recoger parametros por post a guardar
  let param = req.body;

  //Validar datos
  try {
    validateArticle(param);
  } catch (err) {
    return res.status(400).json({
      status: "error",
      message: "Faltan datos por enviar",
      error: err,
    });
  }
  //Crear el objeto a guardar
  const article = new Article(param);

  //Asignar valores a objeto basado en el modelo(manual o automatico)
  //article.titulo = param.title

  //Guardar el articulo en la base de datos
  article.save((err, articleSaved) => {
    if (err || !articleSaved) {
      return res.status(400).json({
        status: "error",
        message: "No se ha guardado el articulo",
        message2: err,
      });
    }

    return res.status(200).json({
      status: "success",
      articleSaved,
    });
  });

  //Devolver resultados
};

const getArticles = (req, res) => {
  let query = Article.find({});

  if (req.params.ultimos) {
    query.limit(3);
  }

  query.sort({ date: -1 }).exec((err, articles) => {
    if (err || !articles) {
      return res.status(404).json({
        status: "error",
        message: "No se han encontrado articulos",
        message2: err,
      });
    }

    return res.status(200).send({
      status: "success",

      contador: articles.length,
      articles,
    });
  });
};

const getArticle = (req, res) => {
  //Recoger id por url
  let id = req.params.id;

  //Buscar el articulo
  Article.findById(id, (err, article) => {
    //Si no existe, devolver error
    if (err || !article) {
      return res.status(404).json({
        status: "error",
        message: "No se encontró el articulo",
      });
    }

    //Devolver resultado
    return res.status(200).send({
      status: "success",
      article,
    });
  });
};

const deleteArticle = (req, res) => {
  let articleId = req.params.id;

  Article.findOneAndDelete({ _id: articleId }, (err, articleDeleted) => {
    if (err || !articleDeleted) {
      return res.status(404).send({
        status: "error",
        message: "Error al borrar",
      });
    }

    return res.status(200).send({
      status: "success",
      article: articleDeleted,
    });
  });
};

const editArticle = (req, res) => {
  //Recoger id del articulo
  let articleId = req.params.id;

  //Recoger datos del body
  let param = req.body;

  //Validar datos
  try {
    validateArticle(param);
  } catch (err) {
    return res.status(400).json({
      status: "error",
      message: "No se pudo actualizar",
      err,
    });
  }
  //Buscar y actualizar articulo
  Article.findOneAndUpdate(
    { _id: articleId },
    param,
    { new: true },
    (err, articleUpdated) => {
      if (err || !articleUpdated) {
        return res.status(500).send({
          status: "error",
          message: "No se ha podido actualizar",
        });
      }

      //Devolver respuesta
      return res.status(200).send({
        status: "success",
        article: articleUpdated,
      });
    }
  );
};

const upload = (req, res) => {
  //Configurar multer

  //Recoger el fichero de imagen subido
  if (!req.file && !req.files) {
    return res.status(400).json({
      status: "error",
      message: "Peticion invalida",
    });
  }

  //Nombre de la imagen
  let nameFile = req.file.originalname;

  //Extensión
  let fileSplit = nameFile.split(".");
  let fileExtension = fileSplit[1];

  //Comprobar extension correcta
  if (
    fileExtension != "png" &&
    fileExtension != "jpg" &&
    fileExtension != "jpeg" &&
    fileExtension != "gif"
  ) {
    //Borrar archivo y dar respuesta
    fs.unlink(req.file.path, (error) => {
      return res.status(400).json({
        status: "error",
        message: "Archivo invalido",
      });
    });
  } else {
    //Si todo va bien, actualizar articulo
    let articleId = req.params.id;

    Article.findOneAndUpdate(
      { _id: articleId },
      { image: req.file.filename },
      { new: true },
      (err, articleUpdated) => {
        if (err || !articleUpdated) {
          return res.status(500).send({
            status: "error",
            message: "No se ha podido actualizar",
          });
        }

        //Devolver respuesta
        return res.status(200).send({
          status: "success",
          article: articleUpdated,
        });
      }
    );
  }
};

const getImage = (req, res) => {
  let file = req.params.file;
  let route = `./src/images/articles/${file}`;

  fs.stat(route, (error, exist) => {
    if (exist) {
      return res.sendFile(path.resolve(route));
    } else {
      return res.status(404).json({
        status: "error",
        message: "Imagen no existe",
        exist,
        file,
        route,
      });
    }
  });
};

const browse = (req, res) => {
  //Sacar el string de busqueda
  let browse = req.params.busqueda;

  //Find OR
  Article.find({
    $or: [
      { title: { $regex: browse, $options: "i" } },
      { content: { $regex: browse, $options: "i" } },
    ],
  })
    .sort({ date: -1 })
    .exec((err, articlesFound) => {
      if ((err && !articlesFound) || articlesFound.length <= 0) {
        return res.status(404).json({
          status: "error",
          message: "No se han encontrado articulos",
        });
      }

      return res.status(200).json({
        status: "success",
        articlesFound,
      });
    });

  //Orden

  //Ejecutar consulta

  //Devolver resultado
};

module.exports = {
  prueba,
  curso,
  create,
  getArticles,
  getArticle,
  deleteArticle,
  editArticle,
  upload,
  getImage,
  browse,
};
