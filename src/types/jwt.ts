export interface IJwtDecoded {
  branchId: string | null;
  companyId: string | null;
  exp: number;
  iat: number;
  id: string;
  role: string;
  sub: string;
  username: string;
}
