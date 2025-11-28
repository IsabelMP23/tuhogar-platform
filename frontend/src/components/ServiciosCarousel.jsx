import { useEffect, useState } from "react";
import CardCarousel from "./CardCarousel.jsx";
import ServicioCard from "./ServicioCard.jsx";
import { fetchServicios } from "../lib/api";

export default function ServiciosCarousel() {
  const [servicios, setServicios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServicios()
      .then((data) => {
        console.log(data);
        setServicios(data);
      })
      .catch((err) => console.error("Error cargando servicios:", err))
      .finally(() => setLoading(false));
  }, []);

  const skeletons = Array.from({ length: 4 }).map((_, i) => (
    <ServicioCard key={i} loading />
  ));

  return (
    <CardCarousel client:visible>
      {loading ? skeletons : servicios.map((s) => <ServicioCard client:visible key={s.id_servicio} {...s} />)}
    </CardCarousel>
  );
}