import { Brand, Category, Model, SizeType, Subcategory } from "./entities";

export interface Sort {
    field: string,
    order: "asc" | "desc"
}

export interface StateCrud<T> {
  page: number;
  totalPages:number;
  data: T[];
  searchQuery: string;
  limit: number;

  setPage: (pag: number) => void;
  setTotalPages: (totPag: number) => void;
  setData: (data: T[]) => void;
  setSearchQuery: (query: string) => void;
  setLimit: (limit: number) => void;
}

export interface SearchQueryProduct {
    name: string, 
    categoryId: string,
    subcategoryId: string,
    brandId: string,
    modelId: string,
    sizeTypeId: string,
}

export interface RelationsProduct {
  category: Category[] | null;
  subcategory: Subcategory[] | null;
  brand: Brand[] | null;
  model: Model[] | null;
  sizeType: SizeType[] | null;
}

export interface FormProps {
  type: "number" | "input" | "select" | "text";
  label: string;
  key: string;// a que coresponde de searchQuery    
  data?: {id:string; name:string}[];
}

