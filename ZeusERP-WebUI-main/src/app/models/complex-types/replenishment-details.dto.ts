export interface ReplenishmentDetailsDto {
    id?: number;
    reference: string;
    productToReplenishId?: number;
    productToReplenishName?: string;
    locationId?: number;
    locationName?: string;
    onHandQuantity: number;
    orderQuantity: number;
    replenishmentStatusId: ReplenishmentStatus;
}
enum ReplenishmentStatus {
    DRAFTED = 0,
    IN_PROGRESS = 1,
    CANCELLED = 2,
    INSUFFICIENT = 3,
    COMPLETE = 4,
}
