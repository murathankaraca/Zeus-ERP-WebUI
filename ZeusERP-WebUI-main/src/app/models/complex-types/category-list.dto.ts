export interface CategoryListDto {
    categoryId: number;
    categoryName: string;
    parentCategoryId?: number;
    parentCategoryName?: string;
}