"use client"

import { motion } from "framer-motion"; // Importamos framer-motion

export function PriceSection() {
  return (
    <section id="price" className="bg-[#4705ff] py-16">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <motion.h2
          className="text-4xl font-montserrat font-bold text-[#ffffff]"
          whileInView={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          Elige el plan perfecto para tu negocio
        </motion.h2>
        <p className="mt-4 text-lg text-gray-100">
          Encuentra el plan que mejor se adapte a las necesidades de tu tienda. ¡Comienza ahora y optimiza tu negocio!
        </p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Plan Gratuito */}
          <motion.div
            className="bg-white border border-gray-200 p-8 rounded-lg shadow-lg hover:shadow-xl transition"
            whileInView={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold text-[#0D47A1]">Gratis</h3>
            <p className="mt-2 text-lg text-gray-500">Ideal para empezar tu negocio</p>
            <p className="mt-4 text-xl font-semibold text-[#0D47A1]">$0</p>
            <div className="mt-4">
              <ul className="list-disc pl-5 text-gray-600">
                <li>Hasta 100 productos</li>
                <li>1 canal de ventas</li>
                <li>Soporte por email</li>
              </ul>
            </div>
            <button className="mt-6 w-full bg-amber-600">
              Empieza Gratis
            </button>
          </motion.div>

          {/* Plan Básico */}
          <motion.div
            className="bg-white border border-gray-200 p-8 rounded-lg shadow-lg hover:shadow-xl transition"
            whileInView={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <h3 className="text-2xl font-bold text-[#0D47A1]">Básico</h3>
            <p className="mt-2 text-lg text-gray-500">Para negocios en crecimiento</p>
            <p className="mt-4 text-xl font-semibold text-[#0D47A1]">$1,499</p>
            <div className="mt-4">
              <ul className="list-disc pl-5 text-gray-600">
                <li>Hasta 500 productos</li>
                <li>2 canales de ventas</li>
                <li>Soporte prioritario</li>
              </ul>
            </div>
            <button className="mt-6 w-full bg-amber-600">
              Contratar Ahora
            </button>
          </motion.div>

          {/* Plan Pro - Destacado */}
          <motion.div
            className="bg-[#FF9800] border border-[#FF9800] p-8 rounded-lg shadow-lg hover:shadow-xl transition transform scale-105"
            whileInView={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-white">Pro</h3>
            <p className="mt-2 text-lg text-white">Para negocios consolidados y de alto rendimiento</p>
            <p className="mt-4 text-xl font-semibold text-white">$3,499</p>
            <div className="mt-4">
              <ul className="list-disc pl-5 text-white">
                <li>Hasta 2000 productos</li>
                <li>Canales ilimitados</li>
                <li>Soporte dedicado 24/7</li>
                <li>Reportes avanzados</li>
              </ul>
            </div>
            <button className="mt-6 w-full bg-amber-600">
              Contratar Ahora
            </button>
            <p className="mt-4 text-white text-sm italic">¡Mejor relación calidad-precio! Oferta limitada</p>
          </motion.div>

          {/* Plan Empresarial */}
          <motion.div
            className="bg-white border border-gray-200 p-8 rounded-lg shadow-lg hover:shadow-xl transition"
            whileInView={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <h3 className="text-2xl font-bold text-[#0D47A1]">Empresarial</h3>
            <p className="mt-2 text-lg text-gray-500">Para grandes empresas con necesidades avanzadas</p>
            <p className="mt-4 text-xl font-semibold text-[#0D47A1]">$6,999</p>
            <div className="mt-4">
              <ul className="list-disc pl-5 text-gray-600">
                <li>Productos ilimitados</li>
                <li>Todos los canales de ventas</li>
                <li>Consultoría personalizada</li>
                <li>Reportes financieros completos</li>
              </ul>
            </div>
            <button className="mt-6 w-full bg-amber-600">
              Contratar Ahora
            </button>
          </motion.div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-lg text-gray-500">¿Tienes dudas? <span className="font-semibold text-[#0D47A1]">Contáctanos</span> para más información.</p>
        </div>
      </div>
    </section>
  );
}
