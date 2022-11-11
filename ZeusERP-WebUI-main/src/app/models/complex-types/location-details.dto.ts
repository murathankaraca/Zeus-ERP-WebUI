export interface LocationDetailsDto {
    id?: number;
    locationName: string;
    locationCode?: string;
    locationTypeId: number;
    addressId?: number;
    addressTitle?: string;
    parentLocationId?: number;
    parentLocationName?: string;
    isInternalLocation?: boolean;
    isScrapLocation?: boolean;
    isReturnLocation?: boolean;
    externalNote?: string;
    stockId?: number;
}