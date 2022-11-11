export interface Location {
  id?: number;
  name: string;
  code?: string;
  locationTypeId: number;
  addressId?: number;
  parentLocationId?: number;
  isInternalLocation?: boolean;
  isScrapLocation?: boolean;
  isReturnLocation?: boolean;
  externalNote?: string;
  stockId?: number;
}
