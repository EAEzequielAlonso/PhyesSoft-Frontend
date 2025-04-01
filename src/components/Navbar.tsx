// components/Navbar.js
import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-[#0D47A1] shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo clickeable */}
        <div className="logo" >
          <Link href="/" className="h-10 text-2xl text-red-100">
          <Image src="./images/Logo-Nombre.svg" alt="Logo SaaS" className="h-14" width="100" height="300"/>
          </Link>
        </div>
        {/* Menú de navegación */}
        <nav className="hidden md:block">
          <ul className="flex space-x-6">
            <li>
              <Link href="#benefits" className="text-white font-montserrat font-medium hover:text-[#1976D2]">
                  Beneficios
              </Link>
            </li>
            <li>
              <Link href="#price" className="text-white font-montserrat font-medium hover:text-[#1976D2]">
                  Precios
              </Link>
            </li>
            <li>
              <Link href="#demo" className="text-white font-montserrat font-medium hover:text-[#1976D2]">
                  Facil Uso
              </Link>
            </li>
            <li>
              <Link href="#testimonials" className="text-white font-montserrat font-medium hover:text-[#1976D2]">
                  Testimonios
              </Link>
            </li>
            <li>
              <Link href="#faq" className="text-white font-montserrat font-medium hover:text-[#1976D2]">
                  FAQ
              </Link>
            </li>
            <li>
              <Link href="#contacto" className="text-white font-montserrat font-medium hover:text-[#1976D2]">
                  Contacto
              </Link>
            </li>
          </ul>
        </nav>
        {/* Acciones: Login y CTA */}
        <div className="flex items-center space-x-4">
          <Link href="/login" className="text-white font-roboto">
            Login
          </Link>
          <Link href="/prueba-gratis" className="bg-[#FF9800] text-white font-montserrat font-bold px-4 py-2 rounded hover:bg-[#e68900]">
              Prueba Gratis
          </Link>
        </div>
      </div>
    </header>
  );
}
