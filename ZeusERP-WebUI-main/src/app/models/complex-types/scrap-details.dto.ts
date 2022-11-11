import { OrderStatus } from "../enums/order-status.enum";

export interface ScrapDetailsDto {
    scrapId: number;
    orderReference: string;
    orderDescription: string,
    productId: number;
    productName: string;
    quantity: number;
    scheduledDate: Date;
    completedDate: Date;
    sourceLocationId: number;
    sourceLocationName: string;
    scrapLocationId: number;
    scrapLocationName: string;
    scrapStatus: OrderStatus;
}