export interface OrderUnbuild {
    id?: number;
    reference: string;
    manufacturingOrderId: number;
    bomId: number;
    quantity: number;
    sourceLocationId: number;
    destinationLocationId: number;
}