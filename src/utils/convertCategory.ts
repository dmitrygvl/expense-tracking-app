import {
  ICategory,
  ISubcategory,
  createSubcategory,
} from '../API/category/category';

export interface IConvertCategory {
  id: string;
  name: string;
  description: string;
  subcategories: ISubcategory[];
}
export const convertSubcategoriesForFirebase = (
  subcategories: string[],
): Record<string, ISubcategory> => {
  const result: Record<string, ISubcategory> = {};

  subcategories.forEach((item) => {
    const subcategory = createSubcategory(item);
    result[subcategory.id] = subcategory;
  });

  return result;
};

const convertSubcategoriesForStore = (
  subcategories: Record<string, ISubcategory>,
) => {
  const result: ISubcategory[] = [];

  if (subcategories) {
    Object.keys(subcategories).forEach((item) => {
      result.push(subcategories[item]);
    });
  }

  return result;
};

export const convertCategoryForStore = (category: ICategory) => {
  const result: IConvertCategory = {
    id: category.id,
    name: category.name,
    description: category.description,
    subcategories: [],
  };
  result.subcategories = convertSubcategoriesForStore(category.subcategories);

  return result;
};

export const convertCategoriesForStore = (
  categories: Record<string, ICategory>,
) => {
  const result: IConvertCategory[] = [];

  Object.keys(categories).forEach((item) => {
    result.push(convertCategoryForStore(categories[item]));
  });

  return result;
};
