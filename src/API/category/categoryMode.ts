import Category from './category';

abstract class CategoryModel {
  abstract getAll(userId: string): Promise<Category[] | null>;

  abstract create(userId: string, category: Category): Promise<string | null>;

  abstract delete(userId: string, id: string): Promise<boolean>;

  abstract deleteAll(userId: string): Promise<boolean>;
}

export default CategoryModel;
