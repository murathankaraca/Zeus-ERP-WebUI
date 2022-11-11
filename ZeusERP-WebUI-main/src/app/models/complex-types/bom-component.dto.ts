import { BillOfMaterials } from '../bom.model';
import { Product } from '../product.model';

export interface BomComponentDetailsDto {
    bomComponentId: number;
    productId: number;
    productName: string;
    bomId: number;
    bomReference: string;
    quantity: number;
}