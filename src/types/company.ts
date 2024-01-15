export interface ICompany {
  id: string;
  name: string;
  description: string;
  showOverTime: boolean;
}

export interface IAddCompanyBody {
  name: string;
  description: string;
  showOverTime: boolean;
  adminUsername: string;
  adminPassword: string;
}
