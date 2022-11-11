export interface CategoryDetailsDto {
    categoryId: number;
    categoryName: string;
    categoryDescription?: string;
    parentCategoryId?: number;
    parentCategoryName?: string;
}