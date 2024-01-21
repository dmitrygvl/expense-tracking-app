import { Database, ref, set, get, child } from 'firebase/database';
import { ICategory } from './category';
import CategoryModel from './categoryModel';

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

  async getAll(userId: string): Promise<ICategory[] | null> {
    try {
      const dbRef = ref(this.db);
      const snapshot = await get(
        child(
          dbRef,
          `${this.parentCollectionName}${userId}${this.collectionName}`,
        ),
      );
      if (snapshot.exists()) {
        return snapshot.val();
      }

      throw new Error('No categories in Firebase!');
    } catch (e) {
      console.log((e as Error).message);
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
    } catch (e) {
      return null;
    }
  }

  async delete(userId: string, id: string): Promise<boolean> {
    return false;
  }

  async deleteAll(userId: string): Promise<boolean> {
    return false;
  }
}

export default FirebaseCategoryModel;
