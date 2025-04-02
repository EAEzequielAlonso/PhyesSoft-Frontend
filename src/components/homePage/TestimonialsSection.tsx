"use client"

import { motion } from 'framer-motion';
import Image from 'next/image';

const testimonials = [
  {
    name: 'María Gómez',
    business: 'Boutique La Moda',
    image: '/images/juan_perez.jpg', // Reemplaza con la ruta de la imagen
    feedback: 'Desde que implementé esta plataforma, mis ventas han aumentado un 35%. ¡Es increíble lo fácil que es de usar!',
  },
  {
    name: 'Juan Pérez',
    business: 'Tienda Estilo Urbano',
    image: '/images/juan_perez.jpg', // Reemplaza con la ruta de la imagen
    feedback: 'La sincronización entre mi tienda online y física es perfecta. Ahora tengo un control total del inventario.',
  },
  {
    name: 'Lucía Fernández',
    business: 'Ropa Chic',
    image: '/images/juan_perez.jpg', // Reemplaza con la ruta de la imagen
    feedback: 'Los reportes inteligentes me han ayudado a entender mejor a mis clientes y aumentar mis ganancias.',
  },
  // Agrega más testimonios según sea necesario
];

export function TestimonialsSection() {
  return (
    <section id= "testimonials" className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <motion.h2
          className="text-4xl font-montserrat font-bold text-[#0D47A1]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Mira lo que dicen nuestros clientes
        </motion.h2>
        <p className="mt-4 text-lg text-gray-700">
          Conoce cómo nuestra plataforma ha transformado los negocios de nuestros clientes.
        </p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-[#F5F5F5] p-8 rounded-lg shadow-lg hover:shadow-xl transition"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className="flex justify-center mb-4">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  width={100}
                  height={100}
                  className="rounded-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-[#0D47A1]">{testimonial.name}</h3>
              <p className="text-sm text-gray-500">{testimonial.business}</p>
              <p className="mt-4 text-gray-600">{testimonial.feedback}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-lg text-gray-500">
            ¿Quieres ser el próximo en transformar tu negocio?
            <a href="/contacto" className="font-semibold text-[#0D47A1] hover:underline">
              Contáctanos
            </a>
            para más información.
          </p>
        </div>
      </div>
    </section>
  );
}
