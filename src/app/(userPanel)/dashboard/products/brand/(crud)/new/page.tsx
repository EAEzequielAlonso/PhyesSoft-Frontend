import { Brand, FormCrud } from "@/types";
import {CreateForm} from "@/components";

interface Props {
    searchParams: Promise<{
        listbrand?: boolean
    }>
}

const NewBrand: React.FC<Props> = async ({searchParams}) => {

    const varios = (await searchParams).listbrand

    const formCrud: FormCrud<Brand>[] = [
        {label: "Nombre", elementForm: "text", key: "name"}
    ]

    return varios ? (
        <div className="w-2/3 bg-white p-4 rounded-lg shadow-xl border border-gray-300 m-auto mt-8">
          <CreateForm endpoint="brand" label="Marca" varios={true} formCrud={formCrud}/>
        </div>
    ) : (
        <div className="w-2/3 bg-white p-4 rounded-lg shadow-xl border border-gray-300 m-auto mt-8">
        <CreateForm endpoint="brand" label="Marca" formCrud={formCrud}/>
      </div> 
    )
}

export default NewBrand;