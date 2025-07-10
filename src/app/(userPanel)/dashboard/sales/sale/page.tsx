"use client";

import { fetchGetClient } from "@/fetchs/dashboard/crudFetchClient";
import { useState, useEffect, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { DailyCash, Product } from "@/types";
import { useToast } from "@/context/ToastContext";
import debounce from 'lodash/debounce';

interface ProductSale {
  id: string;
  productName: string;
  size: string;
  color: string;
  unitPrice: number;
  discount: number;
  quantity: number;
}

export default function SalesSection() {
const {showToast} = useToast()

  const router = useRouter()
  // Estados para el producto escaneado
  const [productAdd, setProductAdd] = useState("");
  const [productCode, setProductCode] = useState("");
  const [productSearch, setProductSearch] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [unitPrice, setUnitPrice] = useState<number>(0);
  const [discount, setDiscount] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);

  //Estados Para busqueda de producto
  const [results, setResults] = useState<Product[]>([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);

  // Estado para sucursal, caja y cotización
  const [boxes, setBoxes] = useState<DailyCash[]>([]);
  const [selectedBox, setSelectedBox] = useState<DailyCash | null>(null);
  //const [dollarRate, setDollarRate] = useState<number>(1215);
  const dollarRate = 1215;

  // Lista de productos en la venta
  const [saleProducts, setSaleProducts] = useState<ProductSale[]>([]);

  // Totales
  const subtotal = saleProducts.reduce((sum, prod) => sum + prod.unitPrice * prod.quantity, 0);
  const totalDiscount = saleProducts.reduce(
    (sum, prod) => sum + (prod.unitPrice * prod.discount / 100) * prod.quantity,
    0
  );
  const total = subtotal - totalDiscount;

  // Pago
  const [paymentMethod, setPaymentMethod] = useState("Efectivo");
  const [amountReceived, setAmountReceived] = useState<number>(0);
  const change = paymentMethod === "Efectivo" ? Math.max(amountReceived - total, 0) : 0;

  // carga inicial de campos
  useEffect(() => {
    const loadBoxes = async () => {
      try {
        const resp: DailyCash[] = await fetchGetClient(
          "daily-cash/open-daily-cash",
          "",
          "Caja Diaria"
        );

        if (resp.length === 0) {
          showToast("No Hay ninguna caja abierta aún. Abra una caja para comenzar a vender","warning")
          router.push("/dashboard/sales/daily-cash");
        } else {
          console.log ("esta es la resp: ", resp)
          setBoxes(resp);
        }
      } catch (error) {
        console.error("No se pudieron cargar las cajas diarias:", error);
      }
    };

    loadBoxes();
  }, []);

  const fetchResults = debounce(async (term: string) => {
    if (!term) return setResults([]);

    setLoading(true);
    try {
      const res = await fetchGetClient("product", `search=${term}`, "Producto");
      console.log("res: ", res[0])
      setResults(res[0]); // máx 10 sugerencias
    } catch (err) {
      console.error('Error fetching products', err);
    } finally {
      setLoading(false);
    }
  }, 300); // 300ms debounce

  useEffect(() => {
    fetchResults(query);
  }, [query]);

  // Manejadores
  const handleUnitPriceChange = (e: ChangeEvent<HTMLInputElement>) => setUnitPrice(Number(e.target.value));
  const handleDiscountChange = (e: ChangeEvent<HTMLInputElement>) => setDiscount(Number(e.target.value));
  const handleQuantityChange = (e: ChangeEvent<HTMLInputElement>) => setQuantity(Number(e.target.value));

  const addProduct = () => {
    if (!productSearch || unitPrice <= 0 || quantity <= 0) return;
    const newProduct: ProductSale = {
      id: crypto.randomUUID(),
      productName: productSearch,
      size,
      color,
      unitPrice,
      discount,
      quantity,
    };
    setSaleProducts((prev) => [...prev, newProduct]);
    setProductCode("");
    setProductSearch("");
    setSize("");
    setColor("");
    setUnitPrice(0);
    setDiscount(0);
    setQuantity(1);
  };

const handleOnChangeBox = (e: React.ChangeEvent<HTMLSelectElement>) => {
  const selectedId = e.target.value;
  const box = boxes.find((bx) => bx.id === selectedId) || null;
  setSelectedBox(box);
};

  return (
    <div className="min-h-screen font-roboto p-2 text-sm bg-gray-50">
      {/* CABECERA */}
      <div className="bg-white p-2 rounded-2xl shadow-md mb-6 flex flex-col md:flex-row items-center gap-4">
        {/* Buscador de Productos */}
        <div className="relative w-full">
          <input
            type="text"
            className="border p-2 w-full"
            placeholder="Buscar producto..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        {loading && <div className="text-sm text-gray-500">Buscando...</div>}
        {results.length > 0 && (
          <ul className="absolute bg-white border w-full max-h-60 overflow-y-auto z-10 text-gray-700">
            {results.map((product) => (
              <li
                key={product.id}
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  onSelect(product);
                  setQuery('');
                  setResults([]);
                }}
              >
                {product.name} - $ {product.price}
              </li>
            ))}
          </ul>
          )}
         </div>
        {/* Caja */}
        <select
          value={selectedBox?.id ?? ""}
          onChange={handleOnChangeBox}
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none">
          {boxes.map((bx) => (
            <option key={bx.id} value={bx.id}>
              {bx.boxCash.name} - {bx.boxCash.branch?.name}
            </option>
          ))}
        </select>

        {/* Cotización dólar */}
        <div className="text-blue-600 font-medium">
          Dólar: ${dollarRate.toFixed(2)}
        </div>
      </div>

      {/* FORMULARIO AGREGAR PRODUCTO */}
      <div className="bg-white p-4 rounded-2xl shadow-md mb-6">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          {/* Producto */}
          <input
            type="text"
            value={productSearch}
            onChange={(e) => setProductSearch(e.target.value)}
            placeholder="Producto"
            className="col-span-2 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none"
          />
          {/* Talle */}
          <input
            type="text"
            value={size}
            onChange={(e) => setSize(e.target.value)}
            placeholder="Talle"
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none"
          />
          {/* Color */}
          <input
            type="text"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            placeholder="Color"
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none"
          />
          {/* Precio */}
          <input
            type="number"
            value={unitPrice || ""}
            onChange={handleUnitPriceChange}
            placeholder="Precio ARS"
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none"
          />
          {/* Descuento */}
          <input
            type="number"
            value={discount || ""}
            onChange={handleDiscountChange}
            placeholder="Descuento %"
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none"
          />
          {/* Cantidad y botón */}
          <div className="flex gap-2 col-span-2">
            <input
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
              placeholder="Cantidad"
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none"
            />
            <button
              onClick={addProduct}
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition"
            >
              Agregar
            </button>
          </div>
        </div>
      </div>

      {/* TABLA Y RESUMEN */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Tabla */}
        <div className="bg-white p-4 rounded-2xl shadow-md flex-1">
          {saleProducts.length > 0 ? (
            <table className="w-full text-left">
              <thead className="border-b">
                <tr>
                  <th className="py-2">Descripción</th>
                  <th className="py-2">Precio</th>
                  <th className="py-2">Cant.</th>
                  <th className="py-2">Desc.</th>
                  <th className="py-2">Total</th>
                </tr>
              </thead>
              <tbody>
                {saleProducts.map((prod) => {
                  const discAmount = (prod.unitPrice * prod.discount) / 100;
                  const finalPrice = prod.unitPrice - discAmount;
                  return (
                    <tr key={prod.id} className="border-b hover:bg-gray-50">
                      <td className="py-2">{prod.productName}</td>
                      <td className="py-2">${prod.unitPrice.toFixed(2)}</td>
                      <td className="py-2">{prod.quantity}</td>
                      <td className="py-2">{prod.discount}%</td>
                      <td className="py-2">${(finalPrice * prod.quantity).toFixed(2)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-500">No hay productos agregados.</p>
          )}
        </div>

        {/* Resumen y Pago */}
        <div className="w-full md:w-1/3 flex flex-col gap-4">
          <div className="bg-white p-4 rounded-2xl shadow-md">
            <h2 className="text-lg font-semibold mb-2">Resumen de Venta</h2>
            <div className="flex justify-between mb-1">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-1">
              <span>Desc. Total</span>
              <span>-${totalDiscount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-xl mt-2">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow-md">
            <h2 className="text-lg font-semibold mb-2">Registrar Pago</h2>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full border py-2 px-3 rounded-lg mb-3 focus:outline-none"
            >
              <option>Efectivo</option>
              <option>Tarjeta</option>
              <option>Transferencia</option>
            </select>
            <input
              type="number"
              placeholder="Monto Recibido"
              value={amountReceived || ""}
              onChange={(e) => setAmountReceived(Number(e.target.value))}
              className="w-full border py-2 px-3 rounded-lg mb-3 focus:outline-none"
            />
            {paymentMethod === "Efectivo" && (
              <div className="flex justify-between mb-3">
                <span>Cambio</span>
                <span>${change.toFixed(2)}</span>
              </div>
            )}
            <button className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg transition">
              Registrar Venta
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
