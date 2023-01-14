import React from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { Footer } from "../components/layout/Footer";
import { Header } from "../components/layout/Header";
import { Nav } from "../components/layout/Nav";
import { Sidebar } from "../components/layout/Sidebar";
import { Article } from "../components/pages/Article";
import { Articles } from "../components/pages/Articles";
import { Browser } from "../components/pages/Browser";
import { Create } from "../components/pages/Create";
import { Edit } from "../components/pages/Edit";
import { Main } from "../components/pages/Main";

export const Router = () => {
  return (
    <BrowserRouter>
      {/*LAYOUT*/}
      <Header />
      <Nav />

      {/*Contenido central y rutas */}
      <section id="content" className="content">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/inicio" element={<Main />} />
          <Route path="/articulos" element={<Articles />} />
          <Route path="/crear-articulo" element={<Create />} />
          <Route path="/buscar/:busqueda" element={<Browser />} />
          <Route
            path="*"
            element={
              <div className="jumbo">
                <h1>Error 404 </h1>
              </div>
            }
          />
          <Route path="/articulo/:id" element={<Article />} />
          <Route path="/editar/:id" element={<Edit />} />
        </Routes>
      </section>

      <Sidebar />
      <Footer />
    </BrowserRouter>
  );
};
