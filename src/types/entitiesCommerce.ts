export interface Branch {
    id: string;
    name: string;
    address: string;
    city: string;
    emailBranch: string;
    initDate: Date;
    central: boolean;
}

export enum EmitionType {
    ELECTRONICO = 'ELECTRONICO',
    FISCAL = 'FISCAL',
    MANUAL = 'MANUAL',
  }

export interface SalePoint {
    id: string;
    name: string;
    description: string;
    emitionType: EmitionType;
    branch: Branch;
    branchId: string;
}

export const dataEmitionType = [
    {id: EmitionType.ELECTRONICO, name: EmitionType.ELECTRONICO},
    {id: EmitionType.FISCAL, name: EmitionType.FISCAL},
    {id: EmitionType.MANUAL, name: EmitionType.MANUAL},
]

