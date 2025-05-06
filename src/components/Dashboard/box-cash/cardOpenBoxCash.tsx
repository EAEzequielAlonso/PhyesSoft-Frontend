import { BoxCash, Branch, MovementType } from "@/types";
import { User } from "@/types/entitiesCount";
import { CashMovForm } from "./cashMovForm";

interface Props {
    dailyCashId: string;
    movType:MovementType[];
    branch: Branch;
    boxCash: BoxCash;
    user: User;
}

export function CardOpenBoxCash ({dailyCashId, movType, branch, boxCash, user}: Props) {
    return (
        <div className="bg-white p-4 m-2 rounded-xl shadow-md font-roboto text-sm border-slate-300 border">
            <div className="flex flex-col items-center">
                <h2 className="">{branch.name}</h2>
                <div className="flex justify-around items-center w-full px-5 mb-1">
                    <h3 className="text-blue-600 text-sm font-semibold" >{boxCash.name}</h3>
                    <button
                        className="btn-text-red"
                    >
                        Cerrar
                    </button>
                </div>
            </div>
            <div className="px-2 flex justify-between items-center">
                <span className="text-blue-500 text-sm font-semibold">Abierta Por: </span> 
                <span className="font-semibold text-right"> {user.name} </span>
            </div>
            <div className=" border border-slate-300 rounded-lg py-2 mt-2">
                <CashMovForm dailyCashId={dailyCashId} movType={movType} />                     
            </div>
        </div>
    )
}