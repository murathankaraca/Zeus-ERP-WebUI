export interface WarehouseDetailsDto {
    warehouseId?: number;
    warehouseCode: string;
    warehouseName: string;
    hasLimitedStockCount?: boolean;
    stockLimit?: number;
    usedForManufacture?: boolean;
    routeListId?: number;
    locationId?: number;
    locationName: string;
    photoPath?: string;
}
