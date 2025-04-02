// components/HeroSection.js
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-[#0D47A1] to-[#1976D2] text-white py-6 md:py-2">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col-reverse md:flex-row items-center">
        {/* Contenido de texto */}
        <motion.div 
          className="w-full md:w-1/2"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-3xl md:text-5xl font-bold font-montserrat">
            Impulsa tu Tienda de Ropa con la Mejor Plataforma de Gestión
          </h1>
          <p className="mt-4 text-xl font-roboto text-gray-200">
            Automatiza tu stock, vende más y gestiona tu negocio en minutos.
          </p>
          <motion.div 
            className="mt-8 flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link
              href="/prueba-gratis"
              className="bg-[#FF9800] text-white px-6 py-3 rounded font-montserrat font-bold hover:bg-[#e68900] transition transform hover:scale-105"
            >
              Empieza Gratis
            </Link>
            <Link
              href="/demo"
              className="border border-[#FF9800] text-[#FF9800] px-6 py-3 rounded font-montserrat font-bold hover:bg-[#FF9800] hover:text-white transition transform hover:scale-105"
            >
              Solicita una Demo
            </Link>
          </motion.div>
          {/* Logos de empresas/marcas */}
          <div className="mt-10">
            <p className="text-sm font-roboto text-gray-300">Confían en nosotros:</p>
            <motion.div 
              className="mt-4 flex items-center space-x-6"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Image src="./images/Logo-Nombre.svg" alt="PHYES Soft" width={200} height={100}></Image>
            </motion.div>
          </div>
        </motion.div>
        
        {/* Imagen demostrativa */}
        <motion.div 
          className="w-full md:w-1/2 mb-8 md:mb-0 flex justify-center"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Image
            src="https://rightpeoplegroup.com/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fduonnzqzi%2Fimage%2Fupload%2Fv1713536160%2Ferp_dcca31fc99.png&w=3840&q=75"
            alt="Demostración de la plataforma"
            width={480}
            height={480}
            className="drop-shadow-xl pl-4 py-5"
          />
        </motion.div>
      </div>
    </section>
  );
}
