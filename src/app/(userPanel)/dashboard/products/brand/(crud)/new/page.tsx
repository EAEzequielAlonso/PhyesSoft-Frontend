import CreateForm from "./createFrom";

interface Props {
    searchParams: Promise<{
        listbrand?: boolean
    }>
}

const NewBrand: React.FC<Props> = async ({searchParams}) => {

    const varios = (await searchParams).listbrand

    console.log("varios: ", varios)

    return varios ? (
        <div className="w-2/3 bg-white p-4 rounded-lg shadow-xl border border-gray-300 m-auto mt-8">
          <CreateForm endpoint="brand" label="Marcas" varios={true}/>
        </div>
    ) : (
        <div className="w-2/3 bg-white p-4 rounded-lg shadow-xl border border-gray-300 m-auto mt-8">
        <CreateForm endpoint="brand" label="Marcas"/>
      </div> 
    )
}

export default NewBrand;