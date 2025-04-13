"use client";

import { useState, ChangeEvent } from "react";

interface ProductSale {
  id: string;
  productName: string;
  size: string;
  color: string;
  unitPrice: number;
  discount: number; // en porcentaje
  quantity: number;
}

export default function SalesSection() {
  // Estados para el formulario de ingreso de producto
  const [productName, setProductName] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [unitPrice, setUnitPrice] = useState<number>(0);
  const [discount, setDiscount] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);

  // Estado para la lista de productos agregados a la venta
  const [saleProducts, setSaleProducts] = useState<ProductSale[]>([]);

  // Estados para datos generales de la venta
  const subtotal = saleProducts.reduce((sum, prod) => sum + prod.unitPrice, 0);
  const totalDiscount = saleProducts.reduce((sum, prod) => {
    const discAmount = (prod.unitPrice * prod.discount) / 100;
    return sum + discAmount;
  }, 0);
  const total = subtotal - totalDiscount;

  // Estados para el pago
  const [paymentMethod, setPaymentMethod] = useState("Efectivo");
  const [amountReceived, setAmountReceived] = useState<number>(0);
  const change = paymentMethod === "Efectivo" ? Math.max(amountReceived - total, 0) : 0;

  // Función para agregar un producto
  const addProduct = () => {
    if (
      !productName.trim() ||
      !size.trim() ||
      !color.trim() ||
      unitPrice <= 0 ||
      quantity <= 0
    )
      return;

    const newProduct: ProductSale = {
      id: crypto.randomUUID(),
      productName: productName.trim(),
      size: size.trim(),
      color: color.trim(),
      unitPrice,
      discount,
      quantity,
    };
    setSaleProducts([...saleProducts, newProduct]);
    // Limpiar campos
    setProductName("");
    setSize("");
    setColor("");
    setUnitPrice(0);
    setDiscount(0);
    setQuantity(1);
  };

  // Manejo de inputs numéricos
  const handleUnitPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUnitPrice(Number(e.target.value));
  };
  const handleDiscountChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDiscount(Number(e.target.value));
  };
  const handleQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuantity(Number(e.target.value));
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] p-1 font-roboto text-xs">
      {/* Formulario para agregar producto */}
<div className="bg-white p-4 rounded-xl shadow-md mb-4">
  <div className="flex flex-col md:flex-row flex-wrap gap-4">
    
    {/* PRODUCTO */}
    <div className="relative flex-1 min-w-[180px]">
      <input
        type="text"
        name="productName"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
        placeholder=" "
        className="peer w-full border border-gray-300 px-3 py-2 rounded text-sm"
      />
      <label className="absolute left-3 top-1 text-xs text-[#0D47A1] bg-white px-1 font-montserrat pointer-events-none transition-all rounded-sm peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-focus:-top-1.5 peer-focus:text-xs">
        Producto
      </label>
    </div>

    {/* TALLE */}
    <div className="relative flex-1 min-w-[120px]">
      <input
        type="text"
        name="size"
        value={size}
        onChange={(e) => setSize(e.target.value)}
        placeholder=" "
        className="peer w-full border border-gray-300 px-3 pt-3 pb-1 rounded text-sm"
      />
      <label className="absolute left-3 top-1 text-xs text-[#0D47A1] bg-white px-1 font-montserrat pointer-events-none transition-all rounded-sm shadow-sm peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-focus:top-1 peer-focus:text-xs">
        Talle
      </label>
    </div>

    {/* COLOR */}
    <div className="relative flex-1 min-w-[120px]">
      <input
        type="text"
        name="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        placeholder=" "
        className="peer w-full border border-gray-300 px-3 pt-3 pb-1 rounded text-sm"
      />
      <label className="absolute left-3 top-1 text-xs text-[#0D47A1] bg-white px-1 font-montserrat pointer-events-none transition-all rounded-sm shadow-sm peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-focus:top-1 peer-focus:text-xs">
        Color
      </label>
    </div>

    {/* PRECIO */}
    <div className="relative flex-1 min-w-[120px]">
      <input
        type="number"
        name="unitPrice"
        value={unitPrice === 0 ? "" : unitPrice}
        onChange={handleUnitPriceChange}
        placeholder=" "
        className="peer w-full border border-gray-300 px-3 pt-3 pb-1 rounded text-sm"
      />
      <label className="absolute left-3 top-1 text-xs text-[#0D47A1] bg-white px-1 font-montserrat pointer-events-none transition-all rounded-sm shadow-sm peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-focus:top-1 peer-focus:text-xs">
        Precio (ARS)
      </label>
    </div>

    {/* DESCUENTO */}
    <div className="relative flex-1 min-w-[120px]">
      <input
        type="number"
        name="discount"
        value={discount === 0 ? "" : discount}
        onChange={handleDiscountChange}
        placeholder=" "
        className="peer w-full border border-gray-300 px-3 pt-3 pb-1 rounded text-sm"
      />
      <label className="absolute left-3 top-1 text-xs text-[#0D47A1] bg-white px-1 font-montserrat pointer-events-none transition-all rounded-sm shadow-sm peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-focus:top-1 peer-focus:text-xs">
        Descuento (%)
      </label>
    </div>

    {/* CANTIDAD */}
    <div className="relative flex-1 min-w-[120px]">
      <input
        type="number"
        name="quantity"
        value={quantity}
        onChange={handleQuantityChange}
        placeholder=" "
        className="peer w-full border border-gray-300 px-3 pt-3 pb-1 rounded text-sm"
      />
      <label className="absolute left-3 top-1 text-xs text-[#0D47A1] bg-white px-1 font-montserrat pointer-events-none transition-all rounded-sm shadow-sm peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-focus:top-1 peer-focus:text-xs">
        Cantidad
      </label>
    </div>

    {/* BOTÓN */}
    <div className="flex items-end">
      <button
        onClick={addProduct}
        className="bg-[#FF9800] hover:bg-[#fb8c00] transition-colors text-white px-4 py-2 rounded font-montserrat text-sm"
      >
        Agregar Producto
      </button>
    </div>
  </div>
</div>


      {/* CONTENIDO INFERIOR: tabla (2/3) y totales+pago (1/3) */}
      <div className="flex flex-col md:flex-row gap-2">
        {/* TABLA - 2/3 */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-2 md:w-2/3">
          {saleProducts.length > 0 ? (
            <table className="min-w-full text-left border-collapse">
              <thead>
                <tr className="border-b text-sm">
                  <th className="py-2 px-4 text-[#0D47A1]">Descripción</th>
                  <th className="py-2 px-4 text-[#0D47A1]">Precio</th>
                  <th className="py-2 px-4 text-[#0D47A1]">Cantidad</th>
                  <th className="py-2 px-4 text-[#0D47A1]">Desc. (%)</th>
                  <th className="py-2 px-4 text-[#0D47A1]">Total</th>
                </tr>
              </thead>
              <tbody>
                {saleProducts.map((prod) => {
                  const discAmount = (prod.unitPrice * prod.discount) / 100;
                  const finalPrice = prod.unitPrice - discAmount;
                  return (
                    <tr key={prod.id} className="border-b hover:bg-gray-100">
                      <td className="py-2 px-4 text-[#424242]">
                        {prod.productName} - Talle {prod.size} - Color {prod.color}
                      </td>
                      <td className="py-2 px-4 text-[#424242]">
                        ${prod.unitPrice.toFixed(2)}
                      </td>
                      <td className="py-2 px-4 text-[#424242]">{prod.quantity}</td>
                      <td className="py-2 px-4 text-[#424242]">{prod.discount}%</td>
                      <td className="py-2 px-4 text-[#424242]">
                        ${(finalPrice * prod.quantity).toFixed(2)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-600">No hay productos agregados a la venta.</p>
          )}
        </div>

        {/* TOTALES Y PAGO - 1/3 */}
        <div className="flex flex-col md:w-1/3 gap-2">
          {/* Resumen General de la Venta */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-2">
            <h2 className="text-xl font-semibold text-[#1976D2] mb-4 font-montserrat">
              Datos Generales de la Venta
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex justify-between border-b pb-2">
                <span className="text-[#424242] font-montserrat">Subtotal:</span>
                <span className="text-[#424242]">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-[#424242] font-montserrat">Descuento Total:</span>
                <span className="text-[#424242]">-${totalDiscount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-xl mt-2">
                <span className="text-[#0D47A1] font-montserrat">Total:</span>
                <span className="text-[#0D47A1]">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Sección de pago y registro de venta */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-[#1976D2] mb-4 font-montserrat">
              Registrar Venta
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block mb-1 text-[#0D47A1] font-montserrat">
                  Forma de Pago
                </label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="border border-gray-300 p-2 rounded w-full"
                >
                  <option value="Efectivo">Efectivo</option>
                  <option value="Tarjeta">Tarjeta</option>
                  <option value="Transferencia">Transferencia</option>
                </select>
              </div>
              <div>
                <label className="block mb-1 text-[#0D47A1] font-montserrat">
                  Monto Abonado
                </label>
                <input
                  type="number"
                  placeholder="Monto abonado"
                  value={amountReceived === 0 ? "" : amountReceived}
                  onChange={(e) => setAmountReceived(Number(e.target.value))}
                  className="border border-gray-300 p-2 rounded w-full"
                />
              </div>
              {paymentMethod === "Efectivo" && (
                <div className="flex flex-col">
                  <label className="block mb-1 text-[#0D47A1] font-montserrat">
                    Cambio
                  </label>
                  <input
                    type="text"
                    readOnly
                    value={`$${change.toFixed(2)}`}
                    className="border border-gray-300 p-2 rounded w-full bg-gray-100"
                  />
                </div>
              )}
            </div>
            <button
              onClick={() => alert("Venta registrada")}
              className="bg-[#FF9800] text-white px-4 py-2 rounded font-montserrat w-full"
            >
              Registrar Venta
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
