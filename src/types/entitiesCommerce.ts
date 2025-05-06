
export interface Branch {
    id: string;
    name: string;
    address: string;
    city: string;
    phone: string;
    emailBranch: string;
    initDate: Date;
    central: boolean;
    boxesCash?: BoxCash[];
    fiscalData?: FiscalData;
    fiscalDataId?: string;
}

export interface BoxCash {
  id: string;
  name: string; 
  branch?: Branch; 
  branchId?: string;
  salePoint?: SalePoint;
  salePointId?: string;
}

export interface Commerce {
  id:string;
  nameFantasy: string;
  nameCompany: string;
  slogan: string; 
  imgLogo: string;
  emailCompany: string;
  InitDate: Date;
}

export interface SalePoint {
    id: string;
    name: string;
    description: string;
    emissionType: string;
    boxCash?: BoxCash;
}

export interface FiscalData {
  id: string;
  name: string;
  cuit: string;
  conditionIva: string;
  addressCommerce: string;
  initActivity: Date;
  ingresosBrutos: string;
  ticketType: string;
  aliasFacturacion?: string;
}

