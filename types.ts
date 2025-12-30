export enum OrderStatus {
  PENDING = 'PENDENTE',
  ACCEPTED = 'ACEITO',
  PREPARING = 'PREPARANDO',
  DELIVERY = 'EM ENTREGA',
  COMPLETED = 'CONCLUÍDO',
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export interface Order {
  id: string;
  customerName: string;
  items: { name: string; quantity: number }[];
  total: number;
  status: OrderStatus;
  timestamp: Date;
}

export interface PartnerStats {
  totalReferrals: number;
  activeStores: number;
  pendingCommission: number;
  paidCommission: number;
  history: { month: string; amount: number }[];
}

export type ViewState = 'landing' | 'restaurant' | 'partner' | 'menu';

export interface ViewProps {
  navigate: (view: ViewState) => void;
}