import { Database } from 'firebase/database';
import Category from './category';
import CategoryModel from './categoryMode';

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

  async getAll(userId: string): Promise<Category[] | null> {
    return null;
  }

  async create(userId: string, category: Category): Promise<string | null> {
    return null;
  }

  async delete(userId: string, id: string): Promise<boolean> {
    return false;
  }

  async deleteAll(userId: string): Promise<boolean> {
    return false;
  }
}

export default FirebaseCategoryModel;
