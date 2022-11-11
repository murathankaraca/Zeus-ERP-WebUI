import { BillOfMaterialComponent } from '../bom-component.model';

export interface BomDetailsDto {
    id?: number;
    bomReference: string;
    productId: number;
    productName: string;
    bomType: number;
    quantity?: number;
    bomComponents?: Array<BillOfMaterialComponent>;
}
