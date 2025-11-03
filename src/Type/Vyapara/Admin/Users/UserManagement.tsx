export interface UserManagementTabType {
  id: number;
  userId: string;
  name: string;
  email: string;
  mobNo: string
  aadhar: string;
  kycstatus: string;
  holdingsValue: Holdings;
  addresses: Address[];
  isActive: boolean
  action: string;
}

export interface Holdings {
  dGold: number;
  dSilver: number;
  total?: number;
}

interface Address {
  id: number;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  pincode: string;
}