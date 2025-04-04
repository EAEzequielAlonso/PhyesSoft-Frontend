export interface Category {
    id: string;
    name: string;
  }

export interface Color {
    id: string;
    name: string;
}
  
  export interface Subcategory {
    id: string;
    name: string;
    categoryId: string;
    category?: Category;
  }
  
  export interface Brand {
    id: string;
    name: string;
  }
  
  export interface Model {
    id: string;
    name: string;
    brandId: string;
    brand?: Brand;
  }
  
  export interface SizeType {
    id: string;
    name: string;
  }

  export interface Size {
    id: string;
    name: string;
    sizetypeId: string;
    sizetype?: Brand;
  }
  
  export interface Product {
    id: string;
    name: string;
    description: string;
    cost: number;
    profit: number;
    price: number;
    createdAt: Date;
    endDate?: Date;
    category: Category;
    categoryId: string;
    subcategory: Subcategory;
    subcategoryId: string;
    brand: Brand;
    brandId: string;
    model: Model;
    modelId: string;
    sizetype: SizeType;
    sizetypeId: string;
  }