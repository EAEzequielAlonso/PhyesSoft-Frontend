import { FC } from "react";
import { CheckCircle, Clock, Truck, DollarSign } from "lucide-react";

interface Pedido {
  id: string;
  cliente: string;
  estado: "Pendiente" | "Preparando" | "En camino" | "Entregado" | "Cobrado";
  fecha: string;
  items: string[];
}

const pedidos: Pedido[] = [
  {
    id: "PED-001",
    cliente: "Juan Pérez",
    estado: "Preparando",
    fecha: "2025-05-21",
    items: ["Camisa x2", "Pantalón x1"],
  },
  {
    id: "PED-002",
    cliente: "María Gómez",
    estado: "Pendiente",
    fecha: "2025-05-22",
    items: ["Zapatos x1"],
  },
  {
    id: "PED-003",
    cliente: "Carlos López",
    estado: "En camino",
    fecha: "2025-05-22",
    items: ["Gorra x1", "Remera x2"],
  },
  {
    id: "PED-004",
    cliente: "Lucía Fernández",
    estado: "Entregado",
    fecha: "2025-05-20",
    items: ["Campera x1"],
  },
  {
    id: "PED-005",
    cliente: "Pedro Martínez",
    estado: "Cobrado",
    fecha: "2025-05-19",
    items: ["Vestido x1", "Cinturón x1"],
  },
];

const estadoIcono: Record<Pedido["estado"], React.ReactNode> = {
  Pendiente: <Clock className="w-5 h-5 text-yellow-500" />,
  Preparando: <CheckCircle className="w-5 h-5 text-blue-500" />,
  "En camino": <Truck className="w-5 h-5 text-orange-500" />,
  Entregado: <CheckCircle className="w-5 h-5 text-green-600" />,
  Cobrado: <DollarSign className="w-5 h-5 text-emerald-600" />,
};

const estadoColor: Record<Pedido["estado"], string> = {
  Pendiente: "bg-yellow-100 text-yellow-700",
  Preparando: "bg-blue-100 text-blue-700",
  "En camino": "bg-orange-100 text-orange-700",
  Entregado: "bg-green-100 text-green-700",
  Cobrado: "bg-emerald-100 text-emerald-700",
};

const PedidosPendientesPage: FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Pedidos Pendientes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pedidos.map((pedido) => (
          <div
            key={pedido.id}
            className="rounded-2xl border shadow p-4 flex flex-col gap-3 bg-white"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">{pedido.id}</h2>
              <span className={`text-sm px-2 py-1 rounded-full ${estadoColor[pedido.estado]}`}>
                {pedido.estado}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              {estadoIcono[pedido.estado]}
              <span>{pedido.cliente}</span>
            </div>
            <ul className="text-sm text-gray-800 list-disc list-inside">
              {pedido.items.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
            <div className="text-sm text-gray-500">Fecha: {pedido.fecha}</div>
            <button className="w-full border px-4 py-2 rounded-md text-sm hover:bg-gray-50">
              Ver detalles
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PedidosPendientesPage;
