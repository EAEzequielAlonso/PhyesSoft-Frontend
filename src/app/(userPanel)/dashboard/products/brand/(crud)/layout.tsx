import {LuCirclePlus, LuListPlus} from "react-icons/lu"
import Link from "next/link";

export default function BrandsCrudLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <div className = "pt-5 w-2/3 m-auto">
        <div className="flex justify-between items-center gap-3 mb-1">
          <div>
            <Link href="/dashboard/products/brand/new">
              <button className="btn-icon-orange mr-3"><LuCirclePlus/></button>
            </Link>
            <Link href="/dashboard/products/brand/new?listbrand=true">
               <button className="btn-icon-orange"> <LuListPlus/> </button>
            </Link>
          </div>
          <h2>Gestión de Marcas</h2>
        </div>
        {children}
    </div>
  );
}
