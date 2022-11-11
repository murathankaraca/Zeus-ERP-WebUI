import { OrderStatus } from "./enums/order-status.enum";

export interface Scrap {
  id?: number;
  reference: string;
  description: string;
  productId: number;
  quantity: number;
  scheduledDate: Date;
  completedDate?: Date;
  sourceLocationId: number;
  scrapLocationId: number;
  scrapStatus?: OrderStatus;
}