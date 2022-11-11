export interface ProductDetailsDto {
    productId: number;
    productName: string;
    categoryId: number;
    categoryName: string;
    productDescription: string;
    canBePurchased: boolean;
    canBeSold: boolean;
    productQuantity: number;
    productCost: number;
    productPrice: number;
    imagePath: string;
    productType: string;
    responsibleId: number;
    responsibleName: string;
    volume: number;
    weight: number;
}