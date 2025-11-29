import { useEffect, useState } from "react";
import CardCarousel from "./CardCarousel.jsx";
import { fetchPropiedades } from "../lib/api";
import PropiedadCard from "./PropiedadCard.jsx";

export default function PropiedadesCarousel({ limit = 5 }) {
  const [propiedades, setPropiedades] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPropiedades()
      .then((data) => setPropiedades(data.propiedades.slice(0, limit)))
      .catch((err) => console.error("Error cargando propiedades:", err))
      .finally(() => setLoading(false));
  }, [limit]);

  const skeletons = Array.from({ length: 5 }).map((_, i) => (
      <PropiedadCard key={i} loading />
    ));

  return (
    <CardCarousel>
       {loading ? skeletons : propiedades.map((prop) => <PropiedadCard key={prop.id_propiedad} propiedad={prop} />)}
    </CardCarousel>
  );
}
