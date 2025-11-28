export default function PropiedadesCard({ prop }) {
  return (
    <a
      href={`/propiedades/${prop.id_propiedad}`}
      className="block bg-white border border-gray-300 shadow rounded-lg overflow-hidden hover:shadow-lg transition"
    >
      <div className="flex flex-col md:flex-row min-h-60 p-4 gap-4">
        <img
          src={prop.imagen_principal}
          alt={prop.titulo}
          width={400}
          height={208}
          className="w-full max-h-52 object-cover md:max-w-64 rounded-lg"
          loading="lazy"
        />

        <aside className="flex-1 flex flex-col justify-between">
          <h2 className="text-xl font-semibold mb-2">{prop.titulo}</h2>
          <p className="text-3xl font-bold mb-2">
            ${prop.precio?.toLocaleString()} <span className="text-xl">MXN</span>
          </p>
          <p className="text-gray-600 mb-4 line-clamp-3 h-18">{prop.descripcion}</p>
          <p className="text-sm text-gray-500 capitalize">
            Tipo: {prop.tipo} | Estado: {prop.estado}
          </p>
        </aside>
      </div>
    </a>
  );
}
