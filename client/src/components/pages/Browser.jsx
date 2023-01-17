import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Global } from "../../helpers/Global";
import { Peticion } from "../../helpers/Peticion";
import { List } from "./List";

export const Browser = () => {
  const [articles, setArticles] = useState([]);
  const [cargando, setCargando] = useState(true);
  const params = useParams();

  useEffect(() => {
    getArticles();
  }, []);

  useEffect(() => {
    getArticles();
  }, [params]);

  const getArticles = async () => {
    let { datos, cargando } = await Peticion(
      Global + "buscar/" + params.busqueda,
      "GET"
    );

    console.log(datos);

    if (datos.status === "success") {
      setArticles(datos.articlesFound);
    } else {
      setArticles([]);
    }
    setCargando(false);
  };

  return (
    <>
      {cargando ? (
        "Cargando..."
      ) : articles.length >= 1 ? (
        <List articles={articles} setArticles={setArticles} />
      ) : (
        <h1>No hay articulos</h1>
      )}
    </>
  );
};
