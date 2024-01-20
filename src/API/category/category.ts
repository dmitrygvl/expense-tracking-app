type TCategoryOptions = {
  id: string;
  name: string;
  subCategories: string[];
  description: string;
};

class Category {
  id: string;

  name: string;

  subCategories: string[];

  description: string;

  constructor(options: TCategoryOptions) {
    const { id, name, subCategories, description } = options;
    this.id = id;
    this.name = name;
    this.subCategories = subCategories;
    this.description = description;
  }
}

export default Category;
