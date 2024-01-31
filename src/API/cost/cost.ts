import { v4 } from 'uuid';

export interface ICost {
  id: string;
  date: number;
  categoryId: string;
  subcategoryId: string;
  payment: number;
}

export const createCost = (
  date: number,
  categoryId: string,
  subcategoryId: string,
  payment: number,
): ICost => ({
  id: v4(),
  date,
  categoryId,
  subcategoryId,
  payment,
});
