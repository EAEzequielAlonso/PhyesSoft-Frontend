import Link from "next/link";
import { memo } from "react";

interface MenuItemProps {
    href: string;
    icon: React.ReactElement;
    text: string;
    isOpen: boolean;
    active: boolean;
  }
  
  export const MenuItem: React.FC<MenuItemProps> = memo(({ href, icon, text, isOpen, active }) => {
    return (
      <Link
        href={href}
        className={`flex items-center gap-3 px-2 py-1 rounded transition w-[147px] ${
          active ? "bg-blue-600" : "hover:bg-blue-600"
        }`}
      >
        {icon}
        {isOpen && <span>{text}</span>}
      </Link>
    );
  });

  MenuItem.displayName = "MenuDropdown";

