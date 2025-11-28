import Filter from "./Filter.jsx";

export default function MobileFilters({ open, setOpen, filtro, setFiltro }) {
  if (!open) return null;

  const close = () => setOpen(false);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-end lg:hidden"
      onClick={close}
    >
      <div
        className="bg-white w-72 h-full shadow-xl p-4 overflow-y-auto animate-slide-left"
        onClick={(e) => e.stopPropagation()} 
      >
        <div className="flex justify-end items-center mb-4">
          <button onClick={close} className="text-xl font-bold">✕</button>
        </div>

        <Filter filtro={filtro} setFiltro={setFiltro} close={close} />
      </div>
    </div>
  );
}