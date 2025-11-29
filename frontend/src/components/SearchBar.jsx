import Search from "../icons/search.svg?react";
import Filter from "../icons/filter.svg?react";

export default function SearchBar({busqueda, setBusqueda, filtro, setFiltro, openFilters}) {
   const handleOrden = (orden) => {
    setFiltro((prev) => ({
      ...prev,
      orden, 
    }));
  };

  return (
    <div className="flex flex-col w-full md:flex-row lg:justify-between lg:items-center mb-4 gap-5 lg:gap-10">
      <label htmlFor="buscar" className="relative flex-1" aria-label="Barra de búsqueda">
        <input
          type="text"
          id="buscar"
          name="buscar"
          placeholder="Buscar..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="bg-white rounded-3xl px-4 py-1 border-2 border-gray-400 w-full"
        />
        <Search
          width={20}
          height={20}
          className="absolute right-2 top-1/2 transform -translate-y-1/2"
        />
      </label>

      <article className="flex flex-row gap-2">
        <button type="button" className="rounded flex-1 md:flex-none bg-gray-200 px-2 py-1 hover:bg-gray-900 hover:text-white cursor-pointer" onClick={() => handleOrden("nuevos")}>
          Nuevos
        </button>
        <button type="button" className="rounded flex-1 md:flex-none bg-gray-200 px-2 py-1 hover:bg-gray-900 hover:text-white cursor-pointer" onClick={() => handleOrden("precio_asc")}>
          Precio ascendente
        </button>
        <button type="button" className="rounded flex-1 md:flex-none bg-gray-200 px-2 py-1 hover:bg-gray-900 hover:text-white cursor-pointer" onClick={() => handleOrden("precio_desc")}>
          Precio descendente
        </button>
        <button type="button" className="rounded bg-gray-200 px-2 py-1 hover:bg-gray-900 hover:text-white cursor-pointer lg:hidden" onClick={openFilters}>
          <Filter width={24} height={24} />
        </button>
      </article>
    </div>
  );
}
