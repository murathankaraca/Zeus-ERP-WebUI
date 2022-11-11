export interface ManufacturingListDto {
    id: number;
    reference: string;
    scheduledDate: Date;
    productId: number;
    productName: string;
    areAllComponentsAvailable: boolean;
    quantityToManufacture: number;
}
