export interface OrdersTabType {
  id: number;
  orderId: string;
  user: string;
  metal: string;
  products: Product[];
  vendor: string;
  amount: string;
  status: string;
  date: string;
  action: string;
}

export interface Product {
  id: number;
  category: string;
  weight: string;
}