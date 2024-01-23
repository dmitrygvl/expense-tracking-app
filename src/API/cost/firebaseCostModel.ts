import { Database, ref, set, get, child, remove } from 'firebase/database';
import { ICost } from './cost';
import { convertCostsForStore } from '../../utils/convertCosts';

abstract class CostModel {
  abstract getAll(uid: string): Promise<ICost[] | null>;

  abstract create(uid: string, cost: ICost): Promise<string | null>;

  abstract deleteCostsOfDeletedCategory(
    uid: string,
    costIds: string[],
  ): Promise<boolean>;
}

class FirebaseCostModel extends CostModel {
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

  async getAll(uid: string): Promise<ICost[] | null> {
    try {
      const dbRef = ref(this.db);
      const snapshot = await get(
        child(
          dbRef,
          `${this.parentCollectionName}${uid}${this.collectionName}`,
        ),
      );
      if (snapshot.exists()) {
        return convertCostsForStore(snapshot.val());
      }

      throw new Error('No costs in Firebase');
    } catch (err) {
      console.log((err as Error).message);
      return null;
    }
  }

  async create(uid: string, cost: ICost): Promise<string | null> {
    try {
      await set(
        ref(
          this.db,
          `${this.parentCollectionName}${uid}${`${this.collectionName}/`}${
            cost.id
          }`,
        ),
        cost,
      );

      return cost.id;
    } catch (err) {
      console.log((err as Error).message);
      return null;
    }
  }

  async deleteCostsOfDeletedCategory(
    uid: string,
    costIds: string[],
  ): Promise<boolean> {
    try {
      for (const id of costIds) {
        await remove(
          ref(
            this.db,
            `${
              this.parentCollectionName
            }${uid}${`${this.collectionName}/`}${id}`,
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

export default FirebaseCostModel;
