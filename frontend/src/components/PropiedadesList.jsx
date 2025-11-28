import PropiedadesCard from "./PropiedadesCard.jsx";
import { useEffect, useState } from "react";
import { fetchPropiedades } from "../lib/api";

export default function PropiedadesList({ initialPage = 1, filtro, busqueda }) {
  const [propiedades, setPropiedades] = useState([]);
  const [filtradas, setFiltradas] = useState([]);
  const [page, setPage] = useState(initialPage);
  const [loading, setLoading] = useState(true);
  const [totalPaginas, setTotalPaginas] = useState(1);

  useEffect(() => {
    setLoading(true);
    fetchPropiedades(page).then((data) => {
      console.log(data);
      setPropiedades(data.propiedades || data);
      setTotalPaginas(data.totalPage || Math.ceil((data.total || 0) / 10));
      setLoading(false);
    });
  }, [page]);

  useEffect(() => {
  const textoBusqueda = busqueda.toLowerCase();
  const textoUbicacion = filtro.ubicacion?.toLowerCase() || "";

  const lista = propiedades.filter((p) => {
    const coincideTipo = !filtro.tipo.toLowerCase() || p.tipo === filtro.tipo.toLowerCase();
    const coincideMin = !filtro.min || p.precio >= Number(filtro.min);
    const coincideMax = !filtro.max || p.precio <= Number(filtro.max);
    const coincideHabitaciones =
      !filtro.habitaciones ||
      p.detalles_propiedad?.cuartos >= Number(filtro.habitaciones);
    const coincideBanos =
      !filtro.banos || p.detalles_propiedad?.banos >= Number(filtro.banos);
    const coincideEstado =
      !filtro.estado || p.estado.toLowerCase() === filtro.estado.toLowerCase();
    const coincideUbicacion =
      !filtro.ubicacion || p.ubicaciones?.direccion.toLowerCase().includes(textoUbicacion) || p.ubicaciones?.ciudad.toLowerCase().includes(textoUbicacion) || p.ubicaciones?.colonia.toLowerCase().includes(textoUbicacion);
    const coincideBusqueda =
      !busqueda || p.titulo.toLowerCase().includes(textoBusqueda);

    return (
      coincideTipo &&
      coincideMin &&
      coincideMax &&
      coincideHabitaciones &&
      coincideBanos &&
      coincideEstado &&
      coincideUbicacion &&
      coincideBusqueda
    );
  });

   if (filtro.orden === "nuevos") {
      lista.sort(
        (a, b) =>
          new Date(b.fecha_publicacion).getTime() -
          new Date(a.fecha_publicacion).getTime()
      );
    }

    if (filtro.orden === "precio_asc") {
      lista.sort((a, b) => a.precio - b.precio);
    }

    if (filtro.orden === "precio_desc") {
      lista.sort((a, b) => b.precio - a.precio);
    }

  setFiltradas(lista);
}, [propiedades, filtro, busqueda]);

  const skeletons = Array.from({ length: 10 }, (_, i) => (
    <div
      key={i}
      className="bg-gray-300 rounded-lg h-60 md:h-52 w-full animate-pulse"
    />
  ));

  return (
    <div className="flex flex-col gap-4 flex-1">
      {loading
        ? skeletons
        : filtradas.map((prop) => (
            <PropiedadesCard key={prop.id_propiedad} prop={prop} />
          ))}

      <div className="flex justify-center gap-4 mt-6">
        <button
          className="px-4 py-2 btn"
          disabled={page === 1 || loading}
          onClick={() => setPage((p) => p - 1)}
        >
          ← Anterior
        </button>

        <span className="btn">
          Pág {page} de {totalPaginas}
        </span>

        <button
          className="px-4 py-2 btn"
          disabled={page === totalPaginas || loading}
          onClick={() => setPage((p) => p + 1)}
        >
          Siguiente →
        </button>
      </div>
    </div>
  );
}