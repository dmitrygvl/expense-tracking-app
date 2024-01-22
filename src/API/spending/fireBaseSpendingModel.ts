import { Database, ref, set, get, child, remove } from 'firebase/database';
import { ISpending } from './spending';
import { convertSpendingsForStore } from '../../utils/convertSpendings';

abstract class SpendingModel {
  abstract getAll(uid: string): Promise<ISpending[] | null>;

  abstract create(uid: string, category: ISpending): Promise<string | null>;

  abstract deleteSpendingsOfDeletedCategory(
    uid: string,
    spendingId: string[],
  ): Promise<boolean>;
}

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

  async getAll(uid: string): Promise<ISpending[] | null> {
    try {
      const dbRef = ref(this.db);
      const snapshot = await get(
        child(
          dbRef,
          `${this.parentCollectionName}${uid}${this.collectionName}`,
        ),
      );
      if (snapshot.exists()) {
        return convertSpendingsForStore(snapshot.val());
      }

      throw new Error('No spendings in firebase.');
    } catch (err) {
      console.log((err as Error).message);
      return null;
    }
  }

  async create(uid: string, spending: ISpending): Promise<string | null> {
    try {
      await set(
        ref(
          this.db,
          `${this.parentCollectionName}${uid}${`${this.collectionName}/`}${
            spending.id
          }`,
        ),
        spending,
      );

      return spending.id;
    } catch (err) {
      console.log((err as Error).message);
      return null;
    }
  }

  async deleteSpendingsOfDeletedCategory(
    userId: string,
    spendingId: string[],
  ): Promise<boolean> {
    try {
      for (const id of spendingId) {
        await remove(
          ref(
            this.db,
            `${
              this.parentCollectionName
            }${userId}${`${this.collectionName}/`}${id}`,
          ),
        );
      }

      return true;
    } catch (err) {
      console.log((err as Error).message);
      return false;
    }
  }
}

export default FirebaseSpendingModel;
