import Spending from './spending';

abstract class SpendingModel {
  abstract getAll(userId: string): Promise<Spending[] | null>;

  abstract create(userId: string, category: Spending): Promise<string | null>;

  abstract delete(userId: string, id: string): Promise<boolean>;

  abstract deleteAll(userId: string): Promise<boolean>;
}

export default SpendingModel;
