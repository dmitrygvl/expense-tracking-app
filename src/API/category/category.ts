import { v4 } from 'uuid';

export interface ISubcategory {
  id: string;
  name: string;
}

export interface ICategory {
  id: string;
  name: string;
  subcategories: Record<string, ISubcategory>;
  description: string;
}

export const createSubcategory = (subcategory: string): ISubcategory => ({
  id: v4(),
  name: subcategory,
});

export const createCategory = (
  name: string,
  description: string,
  subcategories: Record<string, ISubcategory>,
): ICategory => ({
  id: v4(),
  name,
  description,
  subcategories,
});
