export interface IBranch {
  id: string;
  createdAt: Date;
  address: string;
  latitude: number;
  longitude: number;
  radius: number;
  companyId: string;
}

export enum BranchTrackingType {
  LOCATION = "LOCATION",
  BLUETOOTH = "BLUETOOTH",
  ALL = "ALL",
}

export interface ICreateBranchLocationBody {
  address: string;
  latitude: number;
  longitude: number;
  radius: number;
}

export interface ICreateBranchBluetooth {
  names: string[];
}

export interface IAddBranchBody {
  trackingType: BranchTrackingType;
  trackingLocation?: ICreateBranchLocationBody;
  trackingBluetooth?: ICreateBranchBluetooth;
}
