
interface Props {
    params: Promise<{
        id: string
    }>
}

export default async function EditBrandPage ({params}: Props) {
    const brandId = (await params).id
    return <h1>Aca se EDITAN las MArcas. EDITANDO id: {brandId}</h1>
}