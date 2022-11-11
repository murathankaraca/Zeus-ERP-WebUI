import { ProductDetailsDto } from './product-details.dto';

export interface ProductListDto {
    productId: number;
    productName: string;
    categoryId: number;
    categoryName: string;
    description: string;
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