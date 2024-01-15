export interface IBranch {
  id: string;
  createdAt: Date;
  address: string;
  latitude: number;
  longitude: number;
  radius: number;
  companyId: string;
}

export interface IAddBranchBody {
  address: string;
  latitude: number;
  longitude: number;
  radius: number;
  companyId: string;
}
