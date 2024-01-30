import { Database, ref, set, get, child, remove } from 'firebase/database';
import { ICategory } from './category';
import {
  IConvertCategory,
  convertCategoriesForStore,
} from '../../utils/convertCategories';

abstract class CategoryModel {
  abstract getAll(uid: string): Promise<IConvertCategory[] | null>;

  abstract create(uid: string, category: ICategory): Promise<string | null>;

  abstract delete(uid: string, id: string): Promise<boolean>;
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

  async getAll(uid: string): Promise<IConvertCategory[] | null> {
    try {
      const dbRef = ref(this.db);
      const snapshot = await get(
        child(
          dbRef,
          `${this.parentCollectionName}${uid}${this.collectionName}`,
        ),
      );
      if (snapshot.exists()) {
        return convertCategoriesForStore(snapshot.val());
      }

      throw new Error('No categories in Firebase');
    } catch (err) {
      console.log((err as Error).message);
      return null;
    }
  }

  async create(uid: string, category: ICategory): Promise<string | null> {
    try {
      await set(
        ref(
          this.db,
          `${this.parentCollectionName}${uid}${`${this.collectionName}/`}${
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

  async delete(uid: string, id: string): Promise<boolean> {
    try {
      await remove(
        ref(
          this.db,
          `${this.parentCollectionName}${uid}${`${this.collectionName}/`}${id}`,
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
