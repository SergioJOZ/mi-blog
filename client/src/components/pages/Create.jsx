import React from "react";
import { useState } from "react";
import { Global } from "../../helpers/Global";
import { Peticion } from "../../helpers/Peticion";
import { useForm } from "../../hooks/useForm";

export const Create = () => {
  const { formulario, enviado, cambiado } = useForm({});
  const [resultado, setResult] = useState("no_enviado");

  const saveArticle = async (e) => {
    e.preventDefault();

    //Recoger datos del formulario
    let newArticle = formulario;

    //Guardar articulos en el backend
    const { datos, cargando } = await Peticion(
      Global.url + "crear-articulo",
      "POST",
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
      <h1>Crear Articulo</h1>
      <p>Formulario para crear un articulo</p>

      <strong>
        {resultado == "guardado" ? "Articulo guardado con exito" : ""}
      </strong>
      <strong>{resultado == "error" ? "Error en datos" : ""}</strong>
      {/*Montar formulario*/}
      <form className="form" onSubmit={saveArticle}>
        <div className="form-group">
          <label htmlFor="title">Titulo</label>
          <input type="text" name="title" onChange={cambiado} />
        </div>

        <div className="form-group">
          <label htmlFor="content">Contenido</label>
          <textarea type="text" name="content" onChange={cambiado} />
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
