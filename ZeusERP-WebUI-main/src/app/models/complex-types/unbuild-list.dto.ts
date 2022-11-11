export interface UnbuildListDto {
    id: number;
    reference: string;
    productToManufactureId: number;
    productToManufactureName: string;
    manufacturingOrderId: number;
    manufacturingOrderReference: string;
    bomId: number;
    bomReference: string;
    quantity: number;
    sourceLocationId: number;
    sourceLocationName: string;
    destinationLocationId: number;
    destinationLocationName: string;
}