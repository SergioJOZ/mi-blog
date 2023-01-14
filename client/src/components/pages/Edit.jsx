import React from "react";
import { useState, useEffect } from "react";
import { Global } from "../../../helpers/Global";
import { Peticion } from "../../../helpers/Peticion";
import { useForm } from "../../hooks/useForm";
import { useParams } from "react-router-dom";

export const Edit = () => {
  const [article, setArticle] = useState({});

  const { formulario, enviado, cambiado } = useForm({});
  const [resultado, setResult] = useState("no_enviado");
  const params = useParams();

  useEffect(() => {
    getArticle();
  }, []);

  const getArticle = async () => {
    let { datos } = await Peticion(Global.url + "articulo/" + params.id, "GET");

    if (datos.status === "success") {
      setArticle(datos.article);
    }
  };

  const editArticle = async (e) => {
    e.preventDefault();

    //Recoger datos del formulario
    let newArticle = formulario;

    //Guardar articulos en el backend
    const { datos, cargando } = await Peticion(
      Global.url + "articulo/" + params.id,
      "PUT",
      newArticle
    );

    if (datos.status === "success") {
      setResult("guardado");
    } else {
      setResult("error");
    }

    //Subir imagen
    const fileInput = document.querySelector("#file");

    if (datos.status === "success" && fileInput.files[0]) {
      const formData = new FormData();
      formData.append("file0", fileInput.files[0]);

      const subida = await Peticion(
        Global.url + "subir-imagen/" + datos.articleSaved._id,
        "POST",
        formData,
        true
      );

      if (subida.datos.status === "success") {
        setResult("guardado");
      } else {
        setResult("error");
      }
    }
  };

  return (
    <div className="jumbo">
      <h1>Editar Articulo</h1>
      <p>Formulario para editar {article.title}</p>

      <strong>
        {resultado == "guardado" ? "Articulo guardado con exito" : ""}
      </strong>
      <strong>{resultado == "error" ? "Error en datos" : ""}</strong>
      {/*Montar formulario*/}
      <form className="form" onSubmit={editArticle}>
        <div className="form-group">
          <label htmlFor="title">Titulo</label>
          <input
            type="text"
            name="title"
            onChange={cambiado}
            defaultValue={article.title}
          />
        </div>

        <div className="form-group">
          <label htmlFor="content">Contenido</label>
          <div className="mask">
            {article.image == "default.png" && (
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/1200px-Unofficial_JavaScript_logo_2.svg.png" />
            )}
            {article.image != "default.png" && (
              <img src={Global.url + "imagen/" + article.image} />
            )}
          </div>
          <textarea
            type="text"
            name="content"
            onChange={cambiado}
            defaultValue={article.content}
          />
        </div>

        <div className="form-group">
          <label htmlFor="file0">Imagen</label>
          <input type="file" name="file0" id="file" />
        </div>

        <input type="submit" value="Guardar" className="btn btn-success" />
      </form>
    </div>
  );
};
