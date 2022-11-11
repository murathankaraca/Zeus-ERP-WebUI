export interface Transfer {
  id: number,
  receiveFromId: number,
  operationTypeId: number,
  destinationLocationId: number,
  scheduledDate: Date,
  effectiveDate: Date,
  transferProductsId: number,
  responsibleId: number,
}
