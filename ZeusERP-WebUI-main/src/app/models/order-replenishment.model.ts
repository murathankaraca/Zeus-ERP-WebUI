export interface OrderReplenishment {
  id?: number;
  reference: string;
  productToReplenishId: number;
  locationId: number;
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
