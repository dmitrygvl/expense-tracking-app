import { ICategory } from './category';

abstract class CategoryModel {
  abstract getAll(userId: string): Promise<ICategory[] | null>;

  abstract create(userId: string, category: ICategory): Promise<string | null>;

  abstract delete(userId: string, id: string): Promise<boolean>;

  abstract deleteAll(userId: string): Promise<boolean>;
}

export default CategoryModel;
