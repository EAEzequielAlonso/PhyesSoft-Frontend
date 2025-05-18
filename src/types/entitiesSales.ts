import { BoxCash } from "./entitiesCommerce";
import { User } from "./entitiesCount";

export interface PaymentMethod {
    id: string;
    name: string;
    adjustment: number;
}

export interface MovementType {
    id: string;
    name: string;
}

export interface CashMovement {
    id:string;
    amount: number;
    description: string;
    dailyCash: DailyCash;
    dailyCashId: string;
    movementType: MovementType;
    movementTypeId: string;
}

export interface DailyCash {
    id: string;
    dateInit: Date;
    dateFinish: Date;
    initCash: number;
    cash: number;
    transfer: number;
    card: number; 
    discount: number; 
    expenses: number; 
    cashCount: number; 
    transferCount: number; 
    cardCount: number; 
    expensesCount: number; 
    discountCount: number; 
    userOpen?: User;
    userIdOpen?: string;
    boxCash: BoxCash;
    boxCashId:string;
}

export interface saleProduct {
    id: string;
    productIs: string;
    sizeId?:string;
    colorId?: string;
    price:number;
    discount: number;
    quantity: number;
}