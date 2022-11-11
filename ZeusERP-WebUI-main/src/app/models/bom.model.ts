import { BomType } from "./enums/bom-type.enum";

export interface BillOfMaterials {
  id?: number;
  reference: string;
  productId: number;
  bomType: BomType;
  quantity: number;
  componentsId?: number;
}
