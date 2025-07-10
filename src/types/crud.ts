export interface Columns<T> {
   key: keyof T;
   label: string;
   type?: "price" | "porcent" | "text" | "boolean" | "object" | "date"; 
}

export interface ButtonAction<T> {
   href: string;
   nameParam?: keyof T;
   icon: React.ReactElement;
   color: "blue" | "orange" | "red" | "green";
   title: string;
   type?: 'product' 
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
   elementForm: "text" | "number" | "select" | "email" | "checkbox" | "date" | "container";
   key: keyof T;
   data?: SelectOption[]; 
   relation?: string;
   defaultValue?: string | boolean | Date | number;
   required?:boolean;
   placeholder?: string;
   atributeDisplay?: [string, string];
}

