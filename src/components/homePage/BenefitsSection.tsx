'use client';

import { motion } from 'framer-motion';
import { BarChart, ShoppingCart, DollarSign, Smartphone, Zap, ShieldCheck } from 'lucide-react';

export function BenefitsSection() {
  const benefits = [
    {
      icon: <BarChart className="w-12 h-12 text-[#FF9800]" />,
      title: "Control total del inventario",
      description: "Lleva el control de tu stock en tiempo real. Evita pérdidas por desabastecimiento o exceso de productos con alertas automáticas.",
    },
    {
      icon: <ShoppingCart className="w-12 h-12 text-[#FF9800]" />,
      title: "Sincronización con tu tienda",
      description: "Tu tienda física y online siempre conectadas. Sincroniza productos, precios y ventas sin esfuerzo.",
    },
    {
      icon: <DollarSign className="w-12 h-12 text-[#FF9800]" />,
      title: "Reportes inteligentes",
      description: "Obtén análisis detallados de tus ventas, costos y ganancias. Usa datos para tomar decisiones estratégicas y aumentar ingresos.",
    },
    {
      icon: <Smartphone className="w-12 h-12 text-[#FF9800]" />,
      title: "Gestión desde el móvil",
      description: "Administra tu negocio desde cualquier lugar. Recibe notificaciones en tiempo real y mantén el control al alcance de tu mano.",
    },
    {
      icon: <Zap className="w-12 h-12 text-[#FF9800]" />,
      title: "Automatización de pedidos",
      description: "Optimiza la logística con pedidos automáticos y facturación integrada. Reduce errores humanos y mejora la eficiencia.",
    },
    {
      icon: <ShieldCheck className="w-12 h-12 text-[#FF9800]" />,
      title: "Seguridad avanzada",
      description: "Protege tu información con cifrado y copias de seguridad automáticas. Tu negocio seguro en todo momento.",
    },
  ];

  return (
    <section id="benefits" className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
        {/* Título */}
        <motion.h2 
          className="text-4xl md:text-5xl font-bold font-montserrat text-[#0D47A1]"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Las herramientas que harán crecer tu tienda 🚀
        </motion.h2>
        <p className="mt-4 text-lg font-roboto text-gray-700">
          Administra tu negocio de manera más eficiente con nuestra plataforma diseñada para aumentar tu rentabilidad y simplificar procesos.
        </p>

        {/* Lista de Beneficios */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center text-center p-8 rounded-2xl shadow-md bg-gray-50 hover:shadow-xl transition transform hover:scale-105"
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="mb-6">{benefit.icon}</div>
              <h3 className="text-2xl font-semibold text-[#0D47A1]">{benefit.title}</h3>
              <p className="mt-4 text-gray-600 text-lg leading-relaxed">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
