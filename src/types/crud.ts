export interface Columns<T> {
   key: keyof T;
   label: string;
}

export interface FormCrud<T> {
   label: string;
   elementForm: "text" | "number" | "select";
   key: keyof T;
   data?: any[]; 
   relation?: string;
}