export default function PropiedadCard({ propiedad, loading = false }) {
  if (loading) {
    return (
      <div className="bg-gray-300 rounded-lg min-w-[18rem] flex flex-col h-80 animate-pulse"></div>
    );
  }
  return (
    <a href={`/propiedades/${propiedad.id_propiedad}`}>
      <div className="bg-white rounded-lg shadow-md min-w-[18rem] flex flex-col items-center h-80 hover:scale-105 transition-transform duration-300">
        <img
          src={`${propiedad.imagen_principal}?w=300&h=200&fit=crop&fm=webp`}
          alt={propiedad.titulo}
          className="w-full h-48 object-cover rounded-t-md"
          loading="lazy"
        />
        <article className="px-4 py-1 w-full flex flex-col justify-around flex-1 ">
          <h3 className="text-lg font-bold ">
            ${propiedad.precio.toLocaleString()} MXN
          </h3>
          <h4 className="text-md font-medium">{propiedad.titulo}</h4>
          <p className="text-gray-600 text-sm line-clamp-2">
            {propiedad.descripcion}
          </p>
        </article>
      </div>
    </a>
  );
}
