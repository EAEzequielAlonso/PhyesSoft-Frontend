import Link from "next/link";

interface Props  {
    section: string;
    navItems: {name:string; path:string}[]
}

export function SubNavbar({navItems, section}: Props) {
  
    return (
      <nav className=" bg-blue-700 text-white px-4 py-2 flex justify-between items-center shadow-md text-xs">
        <div className="text-base font-semibold ">Administración de {section}.</div>
        <ul className="flex gap-4">
          {navItems.map((item) => (
            <li key={item.path} className="hover:text-slate-300 hover:underline transition-colors p-1 rounded-sm">
              <Link
                href={item.path}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    );
  }
  