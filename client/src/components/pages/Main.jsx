import React from "react";
import { Link } from "react-router-dom";

export const Main = () => {
  return (
    <div className="jumbo">
      <h1>Bienvenido al blog con React</h1>
      <p>Blog desarrollado con MERN stack (MongoDB, Express, React y NodeJS)</p>
      <Link to="/articulos" className="button">
        Ver los articulos
      </Link>
    </div>
  );
};
