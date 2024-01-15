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

export interface IUpdateEmployee {
  phoneNumber?: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  hourlySalary?: number;
  monthlySalary?: number;
  branchId?: string;
}
