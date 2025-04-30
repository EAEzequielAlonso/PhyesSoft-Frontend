// components/Navbar.tsx
"use server"

import Image from 'next/image';
import Link from 'next/link';

export async function NavbarAuth() {
  return (
    <header className="sticky top-0 z-50 bg-[#0D47A1] shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-1 flex items-center justify-between">
        {/* Logo clickeable */}
        <div className="logo" >
          <Link href="/" className="h-10 text-2xl text-red-100">
          <Image src="./images/Logo-Nombre.svg" alt="Logo SaaS" width="150" height="50"/>
          </Link>
        </div>
        
        <div className="flex items-center space-x-4">
              <Link href="/login" className="text-white font-roboto hover:text-orange-500 hover:underline">Login</Link>
              <Link href="/register" className="bg-[#FF9800] text-white font-montserrat font-bold px-4 py-2 rounded hover:bg-[#e68900]">Prueba Gratis</Link>
        </div>
      </div>
    </header>
  );
}
