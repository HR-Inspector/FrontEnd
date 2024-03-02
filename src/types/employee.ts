export interface IEmployee {
  id: string;
  createdAt: Date;
  phoneNumber: string | null;
  firstName: string;
  lastName: string;
  username: string;
  hourlySalary: number | null;
  monthlySalary: number | null;
  role: "EMPLOYEE";
  branchId: string | null;
  companyId: string | null;
}

export interface IEmployeeResponse {
  users: IEmployee[];
  totalCount: number;
}

export interface IUpdateEmployee {
  phoneNumber?: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  hourlySalary?: number;
  monthlySalary?: number;
  branchId?: string;
}

export enum EMPLOYEE_ROLE {
  EMPLOYEE = "EMPLOYEE",
  EDITOR = "EDITOR",
  ADMIN = "ADMIN",
  SUPER_ADMIN = "SUPER_ADMIN",
}
