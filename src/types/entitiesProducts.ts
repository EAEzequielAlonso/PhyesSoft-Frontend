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

  export interface Variant {
    id: string;
    name: string;
  }

  export interface ValueVariant {
    id: string;
    name: string;
    variantId: string;
    variant?: Variant;
  }

  export interface ProductType {
    id: string;
    name: string;
  }

  export interface Iva {
    id: string;
    name: string;
    alicuota: number;
  }

  export interface Provider {
    id: string;
    name: string;
  }

  export interface ProductCodbar {
    id: string;
    codbar:string;
    product:Product;
    productId:string;
    color?:Product;
    colorId?:string;
    size?:Product;
    sizeId?:string;
    valueVariant?:Product;
    valueVariantId?:string;
  }

  export interface Product {
    id: string;
    code?: string;
    name: string;
    description?: string;
    codbar?: string;
    image?: string;

    buyUnit?: number;
    saleUnit?: number;
    cost?: number;
    profit?: number;
    price?: number;

    isActive: boolean;
    hasColor: boolean;
    isPackComp: boolean;
    isSellable: boolean;
    isBuyable: boolean;
    isInsumo: boolean;
    isRawMaterial: boolean;

    category?: Category;
    categoryId?: string;
    subcategory?: Subcategory;
    subcategoryId?: string;
    brand?: Brand;
    brandId?: string;
    model?: Model;
    modelId?: string;
    sizetype?: SizeType;
    sizetypeId?: string;
    variant?: Variant;
    variantId?: string;
    producttype?: ProductType;
    producttypeId?: string;
    ivaBuy?: Iva;
    ivaBuyId?: string;
    ivaSale?: Iva;
    ivaSaleId?: string;
    provider?: Provider;
    providerId?: string;
  }