export type IUser = {
  uid: string;
  name: string;
};

abstract class UserModel {
  abstract getUser(uid: string): Promise<IUser | null>;

  abstract createUser(uid: string, name: string): Promise<string | null>;
}

export default UserModel;
