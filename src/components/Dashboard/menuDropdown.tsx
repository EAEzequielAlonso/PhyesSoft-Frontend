"use client"

import { usePathname } from "next/navigation";
import { memo } from "react";
import { FiChevronDown } from "react-icons/fi";
import {MenuItem} from "@/components";

interface MenuDropdownItem {
  icon: React.ReactElement;
  href: string;
  text: string;
}

interface MenuDropdownProps {
  title: string;
  icon: React.ReactElement;
  isOpen: boolean;
  isExpanded: boolean;
  toggle: () => void;
  items: MenuDropdownItem[];
}

export const MenuDropdown: React.FC<MenuDropdownProps> = memo(({ title, icon, isOpen, isExpanded, toggle, items }) => {
  const pathname = usePathname();
  // Se considera activo si alguna ruta de los items coincide (o es base de la ruta actual)
  const isActive = items.some((item) => pathname.startsWith(item.href));

  return (
    <div>
      <button
        onClick={toggle}
        className={`flex items-center font-semibold justify-between p-2 w-full rounded transition-transform duration-300 ${
          isExpanded || isActive ? "bg-blue-600 shadow-xl" : "hover:bg-blue-600"
        }`}
      >
        <div className="flex items-center gap-3">
          {icon}
          {isOpen && <span className="w-32 text-left">{title}</span>}
        </div>
        {isOpen && (
          <FiChevronDown
            className={`transition-transform duration-300 ${isExpanded ? "rotate-180" : "rotate-0"}`}
          />
        )}
      </button>

      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isExpanded ? "max-h-[500px]" : "max-h-0"
        }`}
      >
        <div className="ml-4 space-y-2">
          {items.map((item) => (
            <MenuItem
              key={item.href}
              href={item.href}
              icon={item.icon}
              text={item.text}
              isOpen={isOpen}
              active={pathname.startsWith(item.href)}
            />
          ))}
        </div>
      </div>
    </div>
  );
});

MenuDropdown.displayName = "MenuDropdown";
