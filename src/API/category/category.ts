import { v4 } from 'uuid';

export interface ICategory {
  id: string;
  name: string;
  subcategories: string[];
  description: string;
}

export const createCategory = (
  name: string,
  description: string,
  subcategories: string[],
): ICategory => ({
  id: v4(),
  name,
  description,
  subcategories,
});
