"use client"; // Requiere interactividad

import React, { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { FaShop, FaRegIdBadge } from "react-icons/fa6";
import {
  LuShoppingCart,    // Ventas
  LuShoppingBasket,           // Productos
  LuGauge,           // Dashboard
  LuUser,            // Mi Cuenta
  LuBrainCircuit,    // Inteligencia Artigficial
  LuChartNoAxesCombined, // Balances
  LuLogOut,           // Logout
  LuUsers,        // Cliente


} from "react-icons/lu";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {MenuItem} from "./";

export const Sidebar: React.FC = () => {
  //const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);
  // const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const pathname = usePathname();
  const toggleSidebar = useCallback(() => setIsOpen((prev) => !prev), []);
  // const toggleSubmenu = useCallback(
  //   (menu: string) => {
  //     if (openSubmenu && openSubmenu !== menu) {
  //       setOpenSubmenu(null);
  //       setTimeout(() => {
  //         setOpenSubmenu(menu);
  //       }, 300); // Debe coincidir con la duración de la animación
  //     } else {
  //       setOpenSubmenu(openSubmenu === menu ? null : menu);
  //     }
  //   },
  //   [openSubmenu]
  // );
  const router = useRouter();
  const handleLogout = async () => {
    try {
      // Primero deslogueo en NestJS
      const resNest = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signout`, {
        method: 'POST',
        credentials: 'include',
      });

      // Luego deslogueo en NextJS
      const resNext = await fetch('/api/auth/signout', {
        method: 'POST',
        credentials: 'include',
      });

      if (resNest.ok && resNext.ok) {
        router.push('/');
      } else {
        console.error('Error cerrando sesión');
      }
    } catch (err) {
      console.error('Error en logout', err);
    }
  };

  return (
    <>
    <div className={`bg-blue-700 text-white h-screen p-2 ${
        isOpen ? "w-40 mr-4" : "w-14"
      } transition-all duration-300 ease-in-out `}>

    </div>
    <aside
      className={`bg-blue-700 text-white h-screen p-2 fixed overflow-y-auto ${
        isOpen ? "w-40" : "w-14"
      } transition-all duration-300 ease-in-out`}
    >
      {/* Botón para abrir/cerrar el sidebar */}
      <button onClick={toggleSidebar} className="mb-6 flex items-center gap-2 text-white w-35">
        <Image src="/images/Logo.svg" alt="Logo SaaS" width="35" height="35" className="ml-1"/>
        {isOpen && <span className="text-white font-bold text-sm w-30">PHYES SOFT</span>}
      </button>

      {/* Menú */}
      <nav className="space-y-2 text-[13px]">

       <MenuItem
          href={"/dashboard"}
          icon={<LuGauge size={20} />}
          text={"Panel Principal"}
          isOpen={isOpen}
          active={pathname!.endsWith("/dashboard")}
        />

        <MenuItem
          href={"/dashboard/sales"}
          icon={<LuShoppingCart size={20} />}
          text={"Ventas"}
          isOpen={isOpen}
          active={pathname!.endsWith("/dashboard/sales")}
        />

        {/* <MenuItem
          href={"/dashboard/clients"}
          icon={<LuUsers size={20} />}
          text={"Clientes"}
          isOpen={isOpen}
          active={pathname!.endsWith("/dashboard/clients")}
        /> */}

        <MenuItem
          href={"/dashboard/products"}
          icon={<LuShoppingBasket size={20} />}
          text={"Productos"}
          isOpen={isOpen}
          active={pathname!.endsWith("/dashboard/products")}
        />

        <MenuItem
          href={"/dashboard/administration"}
          icon={<FaShop size={20} />}
          text={"Mi Comercio"}
          isOpen={isOpen}
          active={pathname!.endsWith("/dashboard/administration")}
        />

        {/* <MenuItem
          href={"/dashboard/employee"}
          icon={<FaRegIdBadge size={20} />}
          text={"Empleados"}
          isOpen={isOpen}
          active={pathname!.endsWith("/dashboard/employee")}
        /> */}

        <MenuItem
          href={"/dashboard/reports"}
          icon={<LuChartNoAxesCombined size={20} />}
          text={"Reportes"}
          isOpen={isOpen}
          active={pathname!.endsWith("/dashboard/reports")}
        />

        <MenuItem
          href={"/dashboard/ia"}
          icon={<LuBrainCircuit size={20} />}
          text={"I. Artifical"}
          isOpen={isOpen}
          active={pathname!.endsWith("/dashboard/ia")}
        />

        <MenuItem
          href={"/dashboard/mycount"}
          icon={<LuUser size={20} />}
          text={"Mi Cuenta"}
          isOpen={isOpen}
          active={pathname!.endsWith("/dashboard/mycount")}
        />
        <button onClick={handleLogout} className="flex items-center cursor-pointer gap-3 p-2 rounded hover:bg-blue-600 transition w-full">
          <div className="flex items-center gap-3">
            <LuLogOut size={20} />
            {isOpen && <span className="w-32 text-left">Cerrar Sesión</span>}
          </div>
        </button>
        
        
      </nav>
    </aside>
    </>
  );
};
