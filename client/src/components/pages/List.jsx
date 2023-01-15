import React from "react";
import { Global } from "../../helpers/Global";
import { Peticion } from "../../helpers/Peticion";
import { Link } from "react-router-dom";

export const List = ({ articles, setArticles }) => {
  const eliminar = async (id) => {
    let { datos } = await Peticion(Global.url + "articulo/" + id, "DELETE");

    if (datos.status === "success") {
      const articlesUpdated = articles.filter((article) => article._id !== id);

      setArticles(articlesUpdated);
    }
  };

  return articles.map((article) => {
    return (
      <article key={article._id} className="article-item">
        <div className="mask">
          {article.image == "default.png" && (
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/1200px-Unofficial_JavaScript_logo_2.svg.png" />
          )}
          {article.image != "default.png" && (
            <img src={Global.url + "imagen/" + article.image} />
          )}
        </div>
        <div className="data">
          <h3 className="title">
            <Link to={"/articulo/" + article._id}> {article.title}</Link>
          </h3>
          <p className="description">{article.content}</p>

          <Link to={"/editar/" + article._id} className="edit">
            Editar
          </Link>
          <button
            className="delete"
            onClick={() => {
              eliminar(article._id);
            }}
          >
            Borrar
          </button>
        </div>
      </article>
    );
  });
};
