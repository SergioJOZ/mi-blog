import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Sidebar = () => {
  const [buscar, setBuscar] = useState("");
  const navegar = useNavigate();

  const Search = (e) => {
    e.preventDefault();
    let mySearch = e.target.search_field.value;
    navegar("/buscar/" + mySearch, { replace: true });
  };

  return (
    <aside className="lateral">
      <div className="search">
        <h3 className="title">Buscador</h3>
        <form onSubmit={Search}>
          <input type="text" name="search_field" />
          <input type="submit" id="search" value="Buscar" />
        </form>
      </div>

      {/*<div className="add">
        <h3 className="title">Añadir pelicula</h3>
        <form>
          <input type="text" placeholder="Titulo" />
          <textarea placeholder="Descripcion"></textarea>
          <input type="submit" value="Guardar" />
        </form>
  </div> */}
    </aside>
  );
};
