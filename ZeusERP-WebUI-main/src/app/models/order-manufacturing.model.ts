export interface OrderManufacturing {
  id?: number;
  reference: string;
  productToManufactureId: number;
  bomId: number;
  quantityToManufacture: number;
  quantityManufactured: number;
  scheduledDate?: Date;
  responsibleId: number;
  componentsId: number;
  componentsLocationId: number;
  finishedProductsLocationId: number;
}
