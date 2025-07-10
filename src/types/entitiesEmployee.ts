import { DailyCash, MovementType } from "./entitiesSales";

export interface EmployeeRole {
  id: string;
  name: string;
  baseSalary: number;
  commission: number;
}

export interface Employee {
  id: string;
  name: string;
  dni: string;
  cuit: string;
  email: string;
  phone: string;
  address: string;
  role?: EmployeeRole;
  roleId?: string;
  baseSalary: number;
  isSaler: boolean;
  commission: number;
  isActive: boolean;
}

export interface Bonus {
  id:string
  name: string;
  value: number;
  isActive?: boolean;
}

export interface SalaryAdvance {
  id:string;
  employee: Employee;
  employeeId: string;
  amount: number;
  createdAt?: Date; 
  reason?: string;
  settled?: boolean;
  dailyCashId?: string;
  dailyCash?: DailyCash;
  movementTypeId?: string;
  movementType?: MovementType;
}

export interface PayrollEmployee {
  id: string;
  employee?: Employee;
  employeeId: string;
    // PERÍODO 
  periodStart: string;
  periodEnd: string;

  baseSalary: number;
  totalSales?: number;
  commission?: number;
  commissionCount?:number;
  bonuses?: number;

  advances?: number;
  advancesCount?: number;
  netSalary?: number; // Sueldo neto a cobrar
  isPaid?: boolean; // Indica si el empleado ya cobró el sueldo
  payrollBonuses?: PayrollBonus[]; // Bonos asociados a la liquidación
  salaryAdvances?: SalaryAdvance[]; // Adelantos de sueldo asociados a la liquidación
} 

export interface PayrollBonus {
  payrollEmployeeId?: string;
  bonusId: string;
  amount: number;
  quantity: number;
}