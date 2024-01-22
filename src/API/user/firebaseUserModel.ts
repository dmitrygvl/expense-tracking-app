import { Database, ref, get, set, child } from 'firebase/database';

export type IUser = {
  uid: string;
  name: string;
};

abstract class UserModel {
  abstract getUser(uid: string): Promise<IUser | null>;

  abstract createUser(uid: string, name: string): Promise<IUser | null>;
}

class FirebaseUserModel extends UserModel {
  private db;

  private collectionName;

  private parentCollectionName;

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

  async getUser(uid: string): Promise<IUser | null> {
    try {
      const dbRef = ref(this.db);
      const snapshot = await get(
        child(
          dbRef,
          `${this.parentCollectionName}${uid}${this.collectionName}`,
        ),
      );
      if (snapshot.exists()) {
        return snapshot.val();
      }

      throw new Error('The user with this ID does not exist.');
    } catch (err) {
      console.log((err as Error).message);
      return null;
    }
  }

  async createUser(uid: string, name: string): Promise<IUser | null> {
    try {
      await set(
        ref(
          this.db,
          `${this.parentCollectionName}${uid}${this.collectionName}`,
        ),
        {
          uid,
          name,
        },
      );

      return { uid, name };
    } catch (err) {
      console.log((err as Error).message);
      return null;
    }
  }
}

export default FirebaseUserModel;
