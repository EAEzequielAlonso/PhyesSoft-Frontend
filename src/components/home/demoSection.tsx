'use client';

import { motion } from 'framer-motion';
import { UserPlus, Package, BarChart, ShoppingCart, TrendingUp } from 'lucide-react';

export function DemoSection() {
  const steps = [
    {
      icon: <UserPlus className="w-12 h-12 text-[#0D47A1]" />,
      title: "Regístrate en minutos",
      description: "Crea tu cuenta rápidamente y accede a todas las herramientas que necesitas para administrar tu negocio.",
    },
    {
      icon: <Package className="w-12 h-12 text-[#0D47A1]" />,
      title: "Agrega tus productos",
      description: "Sube tu catálogo, configura precios y organiza tu inventario sin complicaciones.",
    },
    {
      icon: <BarChart className="w-12 h-12 text-[#0D47A1]" />,
      title: "Administra todo desde un solo lugar",
      description: "Controla inventario, ventas y clientes en una única plataforma fácil de usar.",
    },
    {
      icon: <ShoppingCart className="w-12 h-12 text-[#0D47A1]" />,
      title: "Conéctate con ecommerce y redes",
      description: "Vende en tu tienda online, sincroniza con redes sociales y amplía tu alcance sin esfuerzo.",
    },
    {
      icon: <TrendingUp className="w-12 h-12 text-[#0D47A1]" />,
      title: "Disfruta del crecimiento",
      description: "Recibe reportes automáticos, toma decisiones estratégicas y haz crecer tu negocio con datos en tiempo real.",
    },
  ];

  return (
    <section id="demo" className="bg-gray-100 py-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
        {/* Título */}
        <motion.h2 
          className="text-4xl md:text-5xl font-bold font-montserrat text-[#0D47A1]"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Así de fácil es administrar tu tienda 🚀
        </motion.h2>
        <p className="mt-4 text-lg font-roboto text-gray-700">
          Simplificamos la gestión de tu negocio con un proceso intuitivo y herramientas que facilitan cada paso.
        </p>

        {/* Paso a Paso */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center text-center p-8 rounded-2xl shadow-md bg-white hover:shadow-xl transition transform hover:scale-105"
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="mb-6">{step.icon}</div>
              <h3 className="text-2xl font-semibold text-[#0D47A1]">{index + 1}. {step.title}</h3>
              <p className="mt-4 text-gray-600 text-lg leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div 
          className="mt-12"
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <button className="px-6 py-3 text-lg bg-[#0D47A1] text-white rounded-lg shadow-lg hover:bg-[#08306b] transition">
            Mira una Demo 🔥
          </button>
        </motion.div>
      </div>
    </section>
  );
}
