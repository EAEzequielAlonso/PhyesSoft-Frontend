export interface Columns<T> {
   key: keyof T;
   label: string;
}

export interface SelectOption {
   id: string;
   name: string;
   [key:string]: string;
}

export interface FilterParams {
   label:string;
   data: SelectOption[];
}

export interface FormCrud<T> {
   label: string;
   elementForm: "text" | "number" | "select" | "email" | "checkbox" | "date";
   key: keyof T;
   data?: SelectOption[]; 
   relation?: string;
}

