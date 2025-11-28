export default function ServicioCard({
  nombre,
  descripcion,
  icono,
  loading = false,
}) {
  if (loading) {
    return (
      <div className="bg-gray-300 animate-pulse rounded-lg min-w-[16rem] h-80 flex items-center justify-center"></div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md min-w-[16rem] h-80 flex flex-col items-center p-6">
      <div className="w-22 h-22 aspect-w-1 aspect-h-1">
        <img
          src={icono}
          alt={nombre}
          className="object-cover w-full h-full"
          loading="lazy"
        />
      </div>
      <h3 className="text-xl font-semibold mt-3 text-center">{nombre}</h3>
      <p className="text-gray-600 text-sm mt-2 text-center">{descripcion}</p>
    </div>
  );
}
