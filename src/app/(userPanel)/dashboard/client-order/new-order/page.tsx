"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/context/ToastContext";
import { fetchGetClient } from "@/fetchs/dashboard/crudFetchClient";
import debounce from "lodash/debounce";
import { Product } from "@/types";

interface OrderItem {
  id: string;
  productName: string;
  size: string;
  color: string;
  unitPrice: number;
  quantity: number;
}

interface Client {
    id: string;
    name: string
    dni: string;
    cuit:string;
}

export default function CreateOrder() {
  const router = useRouter();
  const { showToast } = useToast();

  const [clientQuery, setClientQuery] = useState("");
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  const [productQuery, setProductQuery] = useState("");
  const [productResults, setProductResults] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [quantity, setQuantity] = useState<number>(1);

  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [orderDiscount, setOrderDiscount] = useState<number>(0);

  // Fetch clientes
  const fetchClients = debounce(async (term: string) => {
    if (!term) return;
    try {
      const res: Client[] = await fetchGetClient("client", `search=${term}`, "Cliente");
      setClients(res);
    } catch (err) {
      console.error("Error al buscar clientes:", err);
    }
  }, 300);

  useEffect(() => {
    fetchClients(clientQuery);
  }, [clientQuery]);

  // Fetch productos
  const fetchProducts = debounce(async (term: string) => {
    if (!term) return setProductResults([]);
    setLoadingProducts(true);
    try {
      const res: Product[] = await fetchGetClient("product", `search=${term}`, "Producto");
      setProductResults(res);
    } catch (err) {
      console.error("Error al buscar productos:", err);
    } finally {
      setLoadingProducts(false);
    }
  }, 300);

  useEffect(() => {
    fetchProducts(productQuery);
  }, [productQuery]);

  const addItemToOrder = () => {
    if (!selectedProduct || quantity <= 0) return;

    const item: OrderItem = {
      id: crypto.randomUUID(),
      productName: selectedProduct.name,
      size,
      color,
      unitPrice: selectedProduct.price!,
      quantity,
    };

    setOrderItems([...orderItems, item]);
    setSelectedProduct(null);
    setSize("");
    setColor("");
    setQuantity(1);
    setProductQuery("");
    setProductResults([]);
  };

  const subtotal = orderItems.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0
  );
  const discountAmount = (orderDiscount / 100) * subtotal;
  const total = subtotal - discountAmount;

  return (
    <div className="min-h-screen font-roboto p-4 text-sm bg-gray-50">
      {/* Cliente y usuario */}
      <div className="bg-white p-4 rounded-2xl shadow-md mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar cliente..."
            value={clientQuery}
            onChange={(e) => setClientQuery(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded-lg"
          />
          {clients.length > 0 && (
            <ul className="absolute bg-white border w-full max-h-60 overflow-y-auto z-10">
              {clients.map((client) => (
                <li
                  key={client.id}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setSelectedClient(client);
                    setClientQuery(client.name);
                    setClients([]);
                  }}
                >
                  {client.name} - {client.dni || client.cuit}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="text-gray-600 self-center">Usuario: Juan Pérez</div>
      </div>

      {/* Producto */}
      <div className="bg-white p-4 rounded-2xl shadow-md mb-6">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          <input
            type="text"
            placeholder="Buscar producto"
            value={productQuery}
            onChange={(e) => setProductQuery(e.target.value)}
            className="col-span-2 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none"
          />
          <input
            type="text"
            value={size}
            onChange={(e) => setSize(e.target.value)}
            placeholder="Talle"
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none"
          />
          <input
            type="text"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            placeholder="Color"
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none"
          />
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            placeholder="Cantidad"
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none"
          />
          <button
            onClick={addItemToOrder}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition"
          >
            Agregar
          </button>
        </div>
      </div>

      {/* Tabla de productos */}
      <div className="bg-white p-4 rounded-2xl shadow-md mb-6">
        {orderItems.length > 0 ? (
          <table className="w-full text-left">
            <thead className="border-b">
              <tr>
                <th className="py-2">Producto</th>
                <th className="py-2">Talle</th>
                <th className="py-2">Color</th>
                <th className="py-2">Precio</th>
                <th className="py-2">Cant.</th>
                <th className="py-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {orderItems.map((item) => (
                <tr key={item.id} className="border-b hover:bg-gray-50">
                  <td className="py-2">{item.productName}</td>
                  <td className="py-2">{item.size}</td>
                  <td className="py-2">{item.color}</td>
                  <td className="py-2">${item.unitPrice.toFixed(2)}</td>
                  <td className="py-2">{item.quantity}</td>
                  <td className="py-2">${(item.unitPrice * item.quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500">No hay productos agregados al pedido.</p>
        )}
      </div>

      {/* Resumen */}
      <div className="bg-white p-4 rounded-2xl shadow-md w-full md:w-1/2 mx-auto">
        <h2 className="text-lg font-semibold mb-2">Resumen del Pedido</h2>
        <div className="flex justify-between mb-1">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-1">
          <span>Descuento General</span>
          <input
            type="number"
            value={orderDiscount}
            onChange={(e) => setOrderDiscount(Number(e.target.value))}
            className="w-20 border border-gray-300 px-2 py-1 rounded-md text-right"
          />
        </div>
        <div className="flex justify-between font-bold text-xl mt-2">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <button className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition">
          Registrar Pedido
        </button>
      </div>
    </div>
  );
}