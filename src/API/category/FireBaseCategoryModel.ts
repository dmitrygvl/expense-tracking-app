import { Database, ref, set, get, child, remove } from 'firebase/database';
import { ICategory } from './category';
import {
  IConvertCategory,
  convertCategoriesForStore,
} from '../../utils/convertCategory';

abstract class CategoryModel {
  abstract getAll(userId: string): Promise<IConvertCategory[] | null>;

  abstract create(userId: string, category: ICategory): Promise<string | null>;

  abstract delete(userId: string, id: string): Promise<boolean>;
}

class FirebaseCategoryModel extends CategoryModel {
  private db;

  private parentCollectionName;

  private collectionName;

  constructor(
    db: Database,
    parentCollectionName: string,
    collectionName: string,
  ) {
    super();
    this.db = db;
    this.parentCollectionName = parentCollectionName;
    this.collectionName = collectionName;
  }

  async getAll(userId: string): Promise<IConvertCategory[] | null> {
    try {
      const dbRef = ref(this.db);
      const snapshot = await get(
        child(
          dbRef,
          `${this.parentCollectionName}${userId}${this.collectionName}`,
        ),
      );
      if (snapshot.exists()) {
        return convertCategoriesForStore(snapshot.val());
      }

      throw new Error('No categories in Firebase!');
    } catch (err) {
      console.log((err as Error).message);
      return null;
    }
  }

  async create(userId: string, category: ICategory): Promise<string | null> {
    try {
      await set(
        ref(
          this.db,
          `${this.parentCollectionName}${userId}${`${this.collectionName}/`}${
            category.id
          }`,
        ),
        category,
      );

      return category.id;
    } catch (err) {
      console.log((err as Error).message);
      return null;
    }
  }

  async delete(userId: string, id: string): Promise<boolean> {
    try {
      await remove(
        ref(
          this.db,
          `${
            this.parentCollectionName
          }${userId}${`${this.collectionName}/`}${id}`,
        ),
      );

      return true;
    } catch (err) {
      console.log((err as Error).message);
      return false;
    }
  }
}

export default FirebaseCategoryModel;
