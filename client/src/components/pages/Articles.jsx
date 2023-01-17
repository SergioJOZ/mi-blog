import React from "react";
import { useState, useEffect } from "react";

import { Global } from "../../helpers/Global";
import { Peticion } from "../../helpers/Peticion";
import { List } from "./List";

export const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    getArticles();
  }, []);

  const getArticles = async () => {
    /*
    let peticion = await fetch(url, {
      method: "GET",
    });

    let data = await peticion.json();

    if (data.status === "success") {
      setArticles(data.articles);
    }
  };
 */

    let { datos, cargando } = await Peticion(Global + "articulos", "GET");

    if (datos.status === "success") {
      setArticles(datos.articles);
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
