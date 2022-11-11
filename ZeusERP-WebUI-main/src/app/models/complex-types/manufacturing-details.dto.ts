import { ManufacturingOrderComponent } from '../manufacturing-component.model';

export interface ManufacturingDetailsDto {
    id: number;
    reference: string;
    productToManufactureId: number;
    productToManufactureName: string;
    bomId: number;
    bomReference: string;
    quantityToManufacture: number;
    quantityManufactured: number;
    scheduledDate: Date;
    responsibleId: number;
    responsibleName: string;
    componentsId: number;
    componentsUsed: Array<ManufacturingOrderComponent>;
    componentsLocationId: number;
    componentsLocationName: string;
    finishedProductsLocationId: number;
    finishedProductsLocationName: string;
}