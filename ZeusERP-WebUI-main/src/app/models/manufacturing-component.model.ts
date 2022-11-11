export interface ManufacturingOrderComponent {
    id?: number;
    productId?: string;
    quantityToConsume: number;
    quantityConsumed: number;
    isAvailable?: boolean;
}