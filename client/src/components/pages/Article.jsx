import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Peticion } from "../../../helpers/Peticion";
import { Global } from "../../../helpers/Global";

export const Article = () => {
  const [article, setArticle] = useState({});
  const [cargando, setCargando] = useState(true);
  const params = useParams();

  useEffect(() => {
    getArticle();
  }, []);

  const getArticle = async () => {
    let { datos, cargando } = await Peticion(
      Global.url + "articulo/" + params.id,
      "GET"
    );

    console.log(datos);
    if (datos.status === "success") {
      setArticle(datos.article);
    }
    setCargando(false);
  };

  return (
    <div className="jumbo">
      {cargando ? (
        "Cargando..."
      ) : (
        <>
          <div className="mask">
            {article.image == "default.png" && (
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/1200px-Unofficial_JavaScript_logo_2.svg.png" />
            )}
            {article.image != "default.png" && (
              <img src={Global.url + "imagen/" + article.image} />
            )}
          </div>
          <h1>{article.title}</h1>
          <span>{article.date}</span>
          <p>{article.content}</p>
        </>
      )}
    </div>
  );
};
