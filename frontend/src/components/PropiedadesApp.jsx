import { useState } from "react";
import SearchBar from "./SearchBar.jsx";
import Filter from "./Filter.jsx";
import PropiedadesList from "./PropiedadesList.jsx";
import MobileFilters from "./MobileFilters.jsx";

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
    orden: ""
  });

  const [showMobileFilters, setShowMobileFilters] = useState(false);

  return (
    <>
    <section className="max-w-72 hidden lg:block">
       <Filter filtro={filtro} setFiltro={setFiltro} close={() => setShowMobileFilters(false)} />
    </section>
      <MobileFilters
        open={showMobileFilters}
        setOpen={setShowMobileFilters}
        filtro={filtro}
        setFiltro={setFiltro}
      />
      <section className="flex-1 flex flex-col justify-between">
        <SearchBar
          busqueda={busqueda}
          setBusqueda={setBusqueda}
          filtro={filtro}
          setFiltro={setFiltro}
          openFilters={() => setShowMobileFilters(true)}
        />
        <PropiedadesList filtro={filtro} busqueda={busqueda} />
      </section>
      
    </>
  );
}
