import { useState } from "react";
import SearchBar from "./SearchBar.jsx";
import Filter from "./Filter.jsx";
import PropiedadesList from "./PropiedadesList.jsx";

export default function PropiedadesApp() {
  const [busqueda, setBusqueda] = useState("");
  const [filtro, setFiltro] = useState({
    tipo: "",
    min: "",
    max: "",
    ubicacion: "",
    habitaciones: "",
    banos: "",
    estado: "",
  });

  return (
    <>
      <Filter filtro={filtro} setFiltro={setFiltro} />
      <section className="flex-1 flex flex-col justify-between">
        <SearchBar busqueda={busqueda} setBusqueda={setBusqueda} />
        <PropiedadesList filtro={filtro} busqueda={busqueda} />
      </section>
    </>
  );
}
