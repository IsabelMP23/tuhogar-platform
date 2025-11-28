import { useState } from "react";

export default function Filter({ filtro, setFiltro }) {
  const [draftFiltro, setDraftFiltro] = useState(filtro);

  const actualizarFiltro = (campo, valor) => {
    setDraftFiltro((prev) => ({ ...prev, [campo]: valor }));
  }

  const aplicarFiltros = () => {
    setFiltro(draftFiltro);
  }

  const limpiarFiltros = () => {
    setDraftFiltro({
      tipo: "",
      min: "",
      max: "",
      ubicacion: "",
      habitaciones: "",
      banos: "",
      estado: "",
    });
  }



  return (
    <section className="max-w-72 hidden lg:block">
      <article className="bg-white rounded-lg shadow-2xl border p-4">
        <h2 className="text-xl font-semibold mb-4">Filtros</h2>


        <div className="mb-6">
          <h3 className="font-medium text-gray-700 mb-2">Tipo</h3>
          <select
            className="w-full border rounded-lg px-3 py-2"
            value={draftFiltro.tipo}
            onChange={(e) => actualizarFiltro("tipo", e.target.value)}
          >
            <option value="">Todos</option>
            <option>Casa</option>
            <option>Departamento</option>
            <option>Terreno</option>
            <option>Local</option>
          </select>
        </div>

        <div className="mb-6">
          <h3 className="font-medium text-gray-700 mb-2">Precio</h3>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Mín"
              className="w-full border rounded-lg px-3 py-2"
              value={draftFiltro.min}
              onChange={(e) => actualizarFiltro("min", e.target.value)}
            />
            <input
              type="number"
              placeholder="Máx"
              className="w-full border rounded-lg px-3 py-2"
              value={draftFiltro.max}
              onChange={(e) => actualizarFiltro("max", e.target.value)}
            />
          </div>
        </div>

          <div className="mb-6">
          <div className="flex gap-2">
            <label htmlFor="habitaciones">Habitaciones
              <input
              type="number"
              id="habitaciones"
              name="habitaciones"
              placeholder="Ej. 3"
              className="w-full border rounded-lg px-3 py-2 mt-2"
              value={draftFiltro.habitaciones}
              onChange={(e) => actualizarFiltro("habitaciones", e.target.value)}
            />
            </label>

            <label htmlFor="banos">Baños
              <input
              type="number"
              id="banos"
              name="banos"
              placeholder="Ej. 2"
              className="w-full border rounded-lg px-3 py-2 mt-2"
              value={draftFiltro.banos}
              onChange={(e) => actualizarFiltro("banos", e.target.value)}
            />
            </label>
          </div>
        </div>


        <div className="mb-6">
          <h3 className="font-medium text-gray-700 mb-2">Estado</h3>
          <select
            className="w-full border rounded-lg px-3 py-2"
            value={draftFiltro.estado}
            onChange={(e) => actualizarFiltro("estado", e.target.value)}
          >
            <option value="">Todos</option>
            <option value="disponible">Disponible</option>
            <option value="vendida">Vendida</option>
            <option value="rentada">Rentada</option>
          </select>
        </div>

        <div className="mb-6">
          <h3 className="font-medium text-gray-700 mb-2">Ubicación</h3>
          <input
            type="text"
            placeholder="Ej. Guadalajara"
            className="w-full border rounded-lg px-3 py-2"
            value={draftFiltro.ubicacion}
            onChange={(e) => actualizarFiltro("ubicacion", e.target.value)}
          />
        </div>

         <div className="flex flex-col gap-3 mt-4">
          <button
            onClick={aplicarFiltros}
            className="btn font-medium py-2 rounded-lg"
          >
            Aplicar filtros
          </button>

          <button
            onClick={limpiarFiltros}
            className="btn font-medium py-2 rounded-lg"
          >
            Limpiar filtros
          </button>
        </div>


      </article>
    </section>
  );
}