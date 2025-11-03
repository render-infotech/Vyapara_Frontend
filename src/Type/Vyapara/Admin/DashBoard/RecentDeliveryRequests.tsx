export interface RecentDeliveryRequestsTableColumnsType {
  id: number;
  orderId: string;
  user: string;
  item: string;
  status: string;
  color: string;
  action: string;
}

export interface TableActionTypes {
  id: string;
  status: string;
}
