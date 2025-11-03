export interface DepositsTabType {
  id: number;
  depositId: string;
  customer: string;
  vendor: string;
  category: DepositType[];
  value: string;
  date: string;
  action: string;
}

export interface DepositType {
  depositType: string; 
  products: Product[];
}

interface Product {
  id: number;
  name: string;
  purity: string;
  weight: string;
}
