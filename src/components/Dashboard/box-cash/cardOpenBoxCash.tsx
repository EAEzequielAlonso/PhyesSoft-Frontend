import { BoxCash, Branch, MovementType } from "@/types";
import { User } from "@/types/entitiesCount";
import { CashMovForm } from "./cashMovForm";
import Link from "next/link";

interface Props {
    dailyCashId: string;
    movType:MovementType[];
    branch: Branch;
    boxCash: BoxCash;
    user: User;
}

export function CardOpenBoxCash ({dailyCashId, movType, branch, boxCash, user}: Props) {
    
    
    const endpointMov = `/dashboard/sales/cash-movement?branch=${branch.name}&boxCash=${boxCash.name}&dailyCashId=${dailyCashId}`

    return (
        <div className="bg-white p-4 m-2 rounded-xl shadow-md font-roboto text-sm border-slate-300 border">
            <div className="flex flex-col items-center">
                <h2 className="">{branch.name}</h2>
                <div className="flex justify-between items-center w-full px-5 mb-1">
                    <h3 className="text-blue-700 text-sm font-semibold" >{boxCash.name}</h3>
                    <div>
                        <span className="text-blue-700 text-sm font-semibold ml-2">Por: </span> 
                        <span className="font-semibold text-slate-500"> {user.name} </span>
                    </div>
                </div>
            </div> 
            <div className="px-2 flex justify-between items-center">
                <button className="btn-text-red"> Cerrar </button>
                <Link href={endpointMov}>
                    <button className="btn-text-green"> Ver Mov. </button>
                </Link>
            </div>
            <div className=" border border-slate-300 rounded-lg py-2 mt-2">
                <CashMovForm dailyCashId={dailyCashId} movType={movType} />                     
            </div>
        </div>
    )
}