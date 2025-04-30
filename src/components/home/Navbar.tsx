// components/Navbar.tsx
"use server"

import Image from 'next/image';
import Link from 'next/link';
import { cookies } from 'next/headers';

export async function Navbar() {
   const cookieStore = await cookies();
   const token = cookieStore.get('token')?.value;
   const isAuth = !!token;
  return (
    <header className="sticky top-0 z-50 bg-[#0D47A1] shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-1 flex items-center justify-between">
        {/* Logo clickeable */}
        <div className="logo" >
          <Link href="/" className="h-10 text-2xl text-red-100">
          <Image src="./images/Logo-Nombre.svg" alt="Logo SaaS" width="150" height="50"/>
          </Link>
        </div>
        {/* Menú de navegación */}
        <nav className="hidden md:block">
          <ul className="flex space-x-6">
            <li>
              <Link href="#benefits" className="text-white font-montserrat font-medium hover:text-orange-500 hover:underline">
                  Beneficios
              </Link>
            </li>
            <li>
              <Link href="#price" className="text-white font-montserrat font-medium hover:text-orange-500 hover:underline">
                  Precios
              </Link>
            </li>
            <li>
              <Link href="#demo" className="text-white font-montserrat font-medium hover:text-orange-500 hover:underline">
                  Facil Uso
              </Link>
            </li>
            <li>
              <Link href="#testimonials" className="text-white font-montserrat font-medium hover:text-orange-500 hover:underline">
                  Testimonios
              </Link>
            </li>
            <li>
              <Link href="#faq" className="text-white font-montserrat font-medium hover:text-orange-500 hover:underline">
                  FAQ
              </Link>
            </li>
            <li>
              <Link href="#contacto" className="text-white font-montserrat font-medium hover:text-orange-500 hover:underline">
                  Contacto
              </Link>
            </li>
          </ul>
        </nav>
        {/* Acciones: Login y CTA */}
        <div className="flex items-center space-x-4">
           {!isAuth ? ( 
            <>
              <Link href="/login" className="text-white font-roboto hover:text-orange-500 hover:underline">Login</Link>
              <Link href="/register" className="bg-[#FF9800] text-white font-montserrat font-bold px-4 py-2 rounded hover:bg-[#e68900]">Prueba Gratis</Link>
            </>
           ) : (
             <Link href="/dashboard" className="bg-[#FF9800] text-white font-montserrat font-bold px-4 py-2 rounded hover:bg-[#e68900]">Mi Comercio</Link>
           )}
        </div>
      </div>
    </header>
  );
}
