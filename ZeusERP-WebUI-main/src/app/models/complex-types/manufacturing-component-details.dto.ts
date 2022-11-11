export interface ManufacturingComponentDetailsDto {
    id?: number;
    productId?: string;
    productName?: string;
    quantityToConsume: number;
    quantityConsumed: number;
    isAvailable?: boolean;
}