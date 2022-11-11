export interface Warehouse {
  id?: number;
  warehouseCode: string;
  name: string;
  hasLimitedStockCount?: boolean;
  stockLimit?: number;
  usedForManufacture?: boolean;
  routeListId?: number;
  locationId?: number;
  photoPath?: string;
}
