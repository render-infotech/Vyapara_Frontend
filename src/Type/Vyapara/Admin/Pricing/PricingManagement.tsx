export interface PricingTabType {
    id: number;
    metal: string;
    livRate: number;
    adminComm: number | string;
    finPrice: number;
    action: string;
}