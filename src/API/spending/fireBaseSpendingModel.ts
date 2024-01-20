import { Database } from 'firebase/database';
import Spending from './spending';
import SpendingModel from './spendingModel';

class FirebaseSpendingModel extends SpendingModel {
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

  async getAll(userId: string): Promise<Spending[] | null> {
    return null;
  }

  async create(userId: string, spending: Spending): Promise<string | null> {
    return null;
  }

  async delete(userId: string, id: string): Promise<boolean> {
    return false;
  }

  async deleteAll(userId: string): Promise<boolean> {
    return false;
  }
}

export default FirebaseSpendingModel;
