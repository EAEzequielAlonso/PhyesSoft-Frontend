"use client";

import { useState, ChangeEvent } from "react";

interface ProductSale {
  id: string;
  productName: string;
  size: string;
  color: string;
  unitPrice: number;
  discount: number; // en porcentaje
}

export default function SalesSection() {
  // Estados para el formulario de ingreso de producto
  const [productName, setProductName] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [unitPrice, setUnitPrice] = useState<number>(0);
  const [discount, setDiscount] = useState<number>(0);

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
    if (!productName.trim() || !size.trim() || !color.trim() || unitPrice <= 0) return;
    const newProduct: ProductSale = {
      id: crypto.randomUUID(),
      productName: productName.trim(),
      size: size.trim(),
      color: color.trim(),
      unitPrice,
      discount,
    };
    setSaleProducts([...saleProducts, newProduct]);
    // Limpiar campos
    setProductName("");
    setSize("");
    setColor("");
    setUnitPrice(0);
    setDiscount(0);
  };

  // Manejo de inputs numéricos
  const handleUnitPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUnitPrice(Number(e.target.value));
  };
  const handleDiscountChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDiscount(Number(e.target.value));
  };
  // const handleAmountReceivedChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   setAmountReceived(Number(e.target.value));
  // };

  return ( 
    <div className="min-h-screen bg-[#F5F5F5] p-4 font-roboto">
      {/*<motion.h1
        className="text-3xl font-bold text-[#0D47A1] mb-6 font-montserrat"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Generar Venta
      </motion.h1>*/}

      {/* Formulario para agregar producto */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-8">
        {/*<h2 className="text-xl font-semibold text-[#1976D2] mb-4 font-montserrat">
          Ingresar Producto a Vender
        </h2>*/}
        <div className="flex flex-col md:flex-row gap-2">
          <div>
            <label className="block mb-1 text-[#0D47A1] font-montserrat">Producto</label>
            <input
              type="text"
              placeholder="Nombre del producto"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="border border-gray-300 p-2 rounded"
            />
          </div>
          <div>
            <label className="block mb-1 text-[#0D47A1] font-montserrat">Talle</label>
            <input
              type="text"
              placeholder="Ej: M, L, XL"
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className="border border-gray-300 p-2 rounded"
            />
          </div>
          <div>
            <label className="block mb-1 text-[#0D47A1] font-montserrat">Color</label>
            <input
              type="text"
              placeholder="Ej: Rojo, Azul"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="border border-gray-300 p-2 rounded"
            />
          </div>
          <div>
            <label className="block mb-1 text-[#0D47A1] font-montserrat">Precio (ARS)</label>
            <input
              type="number"
              placeholder="Precio"
              value={unitPrice === 0 ? "" : unitPrice}
              onChange={handleUnitPriceChange}
              className="border border-gray-300 p-2 rounded"
            />
          </div>
          <div>
            <label className="block mb-1 text-[#0D47A1] font-montserrat">Descuento (%)</label>
            <input
              type="number"
              placeholder="0"
              value={discount === 0 ? "" : discount}
              onChange={handleDiscountChange}
              className="border border-gray-300 p-2 rounded"
            />
          </div>
          <button
          onClick={addProduct}
          className="mt-4 bg-[#FF9800] text-white px-4 py-2 rounded font-montserrat"
        >
          Agregar Producto
        </button>
        </div>
        
      </div>

      {/* Tabla de productos agregados */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
       {/* <h2 className="text-xl font-semibold text-[#1976D2] mb-4 font-montserrat">
          Resumen de Venta
        </h2> */}
        {saleProducts.length > 0 ? (
          <table className="min-w-full text-left border-collapse">
            <thead>
              <tr className="border-b">
                <th className="py-2 px-4 text-[#0D47A1]">Producto</th>
                <th className="py-2 px-4 text-[#0D47A1]">Talle</th>
                <th className="py-2 px-4 text-[#0D47A1]">Color</th>
                <th className="py-2 px-4 text-[#0D47A1]">Precio</th>
                <th className="py-2 px-4 text-[#0D47A1]">Desc. (%)</th>
                <th className="py-2 px-4 text-[#0D47A1]">Precio Final</th>
              </tr>
            </thead>
            <tbody>
              {saleProducts.map((prod) => {
                const discAmount = (prod.unitPrice * prod.discount) / 100;
                const finalPrice = prod.unitPrice - discAmount;
                return (
                  <tr key={prod.id} className="border-b hover:bg-gray-100">
                    <td className="py-2 px-4 text-[#424242]">{prod.productName}</td>
                    <td className="py-2 px-4 text-[#424242]">{prod.size}</td>
                    <td className="py-2 px-4 text-[#424242]">{prod.color}</td>
                    <td className="py-2 px-4 text-[#424242]">${prod.unitPrice.toFixed(2)}</td>
                    <td className="py-2 px-4 text-[#424242]">{prod.discount}%</td>
                    <td className="py-2 px-4 text-[#424242]">${finalPrice.toFixed(2)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-600">No hay productos agregados a la venta.</p>
        )}
      </div>

      {/* Resumen General de la Venta */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
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
            <label className="block mb-1 text-[#0D47A1] font-montserrat">Forma de Pago</label>
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
            <label className="block mb-1 text-[#0D47A1] font-montserrat">Monto Abonado</label>
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
              <label className="block mb-1 text-[#0D47A1] font-montserrat">Cambio</label>
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
  );
}
