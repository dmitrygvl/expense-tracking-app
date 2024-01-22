import { v4 } from 'uuid';

export interface ISpending {
  id: string;
  date: number;
  categoryId: string;
  subcategoryId: string;
  payment: number;
}

export const createSpending = (
  date: number,
  categoryId: string,
  subcategoryId: string,
  payment: number,
): ISpending => ({
  id: v4(),
  date,
  categoryId,
  subcategoryId,
  payment,
});
