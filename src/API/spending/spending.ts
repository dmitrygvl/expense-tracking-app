type TSpendingOption = {
  id: string;
  date: number;
  category: string;
  subCategory: string;
  payment: number;
};

class Spending {
  id: string;

  date: number;

  category: string;

  subCategory: string;

  payment: number;

  constructor(options: TSpendingOption) {
    const { id, date, category, subCategory, payment } = options;
    this.id = id;
    this.date = date;
    this.category = category;
    this.subCategory = subCategory;
    this.payment = payment;
  }
}

export default Spending;
