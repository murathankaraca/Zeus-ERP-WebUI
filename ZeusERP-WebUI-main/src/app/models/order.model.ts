export interface Order {
  id?: number,
  operationType: string,
  code: string,
  warehouseId: number,
  typeOfOperationId: number,
  defaultSourceId: number,
  defaultDestinationId: number,
}