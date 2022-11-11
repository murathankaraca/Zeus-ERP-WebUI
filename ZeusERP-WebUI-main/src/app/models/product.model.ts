
export interface Product {
  id? : number,
  categoryId?: number,
  name: string,
  description?: string,
  type: string,
  barcodeNumber?: string,
  unitCount: number,
  unitPrice: number,
  unitCost: number,
  canBeSold?: boolean,
  canBePurchased?: boolean,
  responsibleId?: number,
  weight?: number,
  volume?: number,
  bomId?: number,
  imgPath?: string
}