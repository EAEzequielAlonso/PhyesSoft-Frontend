import { FormCrud } from "@/types";

interface Props <T> {
    endpoint: string;
    label: string;
    items: T[];
    form: FormCrud<T>[]
}

export function relationsForm () {
    return (
        <form>

            relationsForm
        </form>
    )
}
